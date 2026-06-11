import React, { useState, useEffect } from 'react';
import { MicroUtility } from '../types';
import { CATEGORY_COLORS } from '../data';
import { evaluateCalculator, CalculationResult } from '../calculatorEngine';
import AeoPerformance from './AeoPerformance';
import FractionalFaq from './FractionalFaq';
import { Play, RotateCcw, AlertCircle, Info, Calculator, Sparkles, TrendingUp, BarChart2 } from 'lucide-react';

interface ActiveCalculatorProps {
  utility: MicroUtility;
}

export default function ActiveCalculator({ utility }: ActiveCalculatorProps) {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [calcResult, setCalcResult] = useState<CalculationResult | null>(null);

  // Initialize form default values
  useEffect(() => {
    const defaults: Record<string, any> = {};
    utility.inputs.forEach(input => {
      defaults[input.name] = input.defaultValue;
    });
    setFormValues(defaults);
  }, [utility]);

  // Execute continuous math computations
  useEffect(() => {
    if (Object.keys(formValues).length > 0) {
      const outcome = evaluateCalculator(utility.id, formValues);
      setCalcResult(outcome);
    }
  }, [formValues, utility]);

  const handleInputChange = (name: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    const defaults: Record<string, any> = {};
    utility.inputs.forEach(input => {
      defaults[input.name] = input.defaultValue;
    });
    setFormValues(defaults);
  };

  const colors = CATEGORY_COLORS[utility.category];

  // Helper to render custom visual SVG charts dynamically based on utility.id and outcomes
  const renderVisualizer = () => {
    if (!calcResult || !calcResult.chartData || calcResult.chartData.length === 0) return null;

    const data = calcResult.chartData;
    const isPieStyle = [2, 4, 6, 10, 14].includes(utility.id);
    const isLineStyle = [1, 3, 5, 9, 36, 41].includes(utility.id);

    if (isPieStyle) {
      // Circular Donut/Pie visualizer
      let accumulatedPercent = 0;
      const parsedSlices = data.map((item, idx) => {
        const val = typeof item.Value === 'number' ? item.Value : (typeof item.Weight === 'number' ? item.Weight : 25);
        return { label: item.label, value: val };
      });
      const totalSum = parsedSlices.reduce((acc, curr) => acc + curr.value, 0) || 1;

      // Color palettes for segments
      const sliceColors = [
        'stroke-blue-600 fill-none',
        'stroke-emerald-500 fill-none',
        'stroke-rose-500 fill-none',
        'stroke-amber-500 fill-none',
        'stroke-sky-500 fill-none',
      ];

      return (
        <div className="flex flex-col sm:flex-row items-center justify-around p-6 bg-gray-50/50 rounded-2xl border border-gray-200 gap-6">
          <div className="relative w-44 h-44">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {parsedSlices.map((slice, idx) => {
                const percent = slice.value / totalSum;
                const dashArray = `${percent * 251.2} 251.2`;
                const dashOffset = -accumulatedPercent * 251.2;
                accumulatedPercent += percent;

                 return (
                  <circle
                    key={idx}
                    cx="50"
                    cy="50"
                    r="40"
                    className={`transition-all duration-500 ${sliceColors[idx % sliceColors.length]}`}
                    strokeWidth="12"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                  />
                );
              })}
              <circle cx="50" cy="50" r="30" className="fill-white" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xs uppercase tracking-widest text-gray-400 font-semibold font-sans">Composition</span>
              <span className="text-lg font-bold font-mono text-gray-900">100%</span>
            </div>
          </div>

          <div className="flex-1 space-y-3 shrink-0">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 leading-none">
              <BarChart2 className="w-3.5 h-3.5 text-gray-400" />
              Allocation Percentages
            </h5>
            <div className="grid grid-cols-1 gap-2">
              {parsedSlices.map((slice, idx) => {
                const percentVal = ((slice.value / totalSum) * 100).toFixed(1);
                // Color badges matching circles
                const textCol = [
                  'text-blue-600 bg-blue-50 border-blue-200/50',
                  'text-emerald-600 bg-emerald-50 border-emerald-200/50',
                  'text-rose-600 bg-rose-50 border-rose-200/50',
                  'text-amber-600 bg-amber-50 border-amber-200/50',
                  'text-sky-600 bg-sky-50 border-sky-200/50'
                ][idx % 5];

                return (
                  <div key={idx} className="flex items-center justify-between text-xs p-2.5 bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
                    <span className="text-gray-700 flex items-center gap-1.5 font-medium">
                      <span className={`w-2.5 h-2.5 rounded-full ${[
                        'bg-blue-600', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500', 'bg-sky-500'
                      ][idx % 5]}`} />
                      {slice.label}
                    </span>
                    <span className={`font-mono font-semibold px-2 py-0.5 rounded border ${textCol}`}>
                      {percentVal}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    if (isLineStyle) {
      // Line/Area projection curves
      // Find maximum variable bound to scale coordinates properly
      const keys = Object.keys(data[0]).filter(k => k !== 'label');
      let maxVal = 1;
      
      data.forEach((item: any) => {
        keys.forEach(k => {
          if (item[k] > maxVal) maxVal = item[k];
        });
      });

      // SVG dimensions
      const width = 500;
      const height = 180;
      const paddingLeft = 60;
      const paddingRight = 20;
      const paddingTop = 20;
      const paddingBottom = 30;

      const plotWidth = width - paddingLeft - paddingRight;
      const plotHeight = height - paddingTop - paddingBottom;

      // Coordinate scaling formulas
      const getX = (index: number) => {
        const total = data.length - 1;
        const ratio = total > 0 ? index / total : 0.5;
        return paddingLeft + ratio * plotWidth;
      };

      const getY = (value: any) => {
        const val = Number(value);
        if (isNaN(val) || !isFinite(val)) {
          return paddingBottom + plotHeight;
        }
        const normMax = maxVal || 1;
        return paddingBottom + plotHeight - (val / normMax) * plotHeight;
      };

      // Render line coordinates paths
      const paths = keys.map((key, idx) => {
        let pathStr = '';
        data.forEach((item: any, i) => {
          const x = getX(i);
          const y = getY(item[key]);
          if (i === 0) pathStr += `M ${x} ${y}`;
          else pathStr += ` L ${x} ${y}`;
        });
        return { key, pathStr };
      });

      // Shaded area backings for line primary key
      const mainPathKey = keys[0];
      let areaPathStr = '';
      if (mainPathKey) {
        data.forEach((item: any, i) => {
          const x = getX(i);
          const y = getY(item[mainPathKey]);
          if (i === 0) areaPathStr += `M ${x} ${paddingBottom + plotHeight} L ${x} ${y}`;
          else areaPathStr += ` L ${x} ${y}`;
        });
        areaPathStr += ` L ${getX(data.length - 1)} ${paddingBottom + plotHeight} Z`;
      }

      return (
        <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 leading-none">
              <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
              Trend Projection Model
            </h5>
            <div className="flex items-center gap-3">
              {keys.map((key, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-2xs font-medium text-gray-600">
                  <span className={`w-2.5 h-0.5 ${idx === 0 ? 'bg-blue-600' : 'bg-rose-500'}`} />
                  {key}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
              {/* Gradients */}
              <defs>
                <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0066FF" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#0066FF" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              {/* Grid Y Guidelines */}
              {[0, 0.25, 0.5, 0.75, 1].map((p, i) => {
                const y = paddingBottom + plotHeight - p * plotHeight;
                return (
                  <g key={i} className="opacity-60">
                    <line 
                      x1={paddingLeft} 
                      y1={y} 
                      x2={width - paddingRight} 
                      y2={y} 
                      className="stroke-gray-150" 
                      strokeDasharray="4 4"
                    />
                    <text 
                      x={paddingLeft - 8} 
                      y={y + 4} 
                      className="fill-gray-450 font-mono text-[9px] text-right font-medium" 
                      textAnchor="end"
                    >
                      {maxVal >= 1000 ? `${Math.round(maxVal * p / 1000)}k` : Math.round(maxVal * p)}
                    </text>
                  </g>
                );
              })}

              {/* Shaded Area */}
              {areaPathStr && (
                <path d={areaPathStr} className="fill-[url(#area-grad)]" />
              )}

              {/* Paths */}
              {paths.map((p, idx) => (
                <path 
                  key={idx} 
                  d={p.pathStr} 
                  className={`fill-none ${idx === 0 ? 'stroke-blue-600' : 'stroke-rose-500'} stroke-2 transition-all duration-500`}
                />
              ))}

              {/* Interactive Circles / Dots */}
              {data.map((item: any, i) => {
                const x = getX(i);
                return (
                  <g key={i} className="group cursor-help">
                    <line 
                      x1={x} 
                      y1={paddingTop} 
                      x2={x} 
                      y2={paddingBottom + plotHeight} 
                      className="stroke-gray-250 opacity-0 group-hover:opacity-100 transition-opacity" 
                    />
                    {keys.map((key, idx) => (
                      <circle 
                        key={idx} 
                        cx={x} 
                        cy={getY(item[key])} 
                        r="3.5" 
                        className={`${idx === 0 ? 'fill-blue-600 stroke-white' : 'fill-rose-500 stroke-white'} stroke-2 transition-all duration-300`} 
                      />
                    ))}
                  </g>
                );
              })}

              {/* X Axis Labels */}
              {data.map((item, i) => {
                // Limit X axis labels to prevent cluttering
                if (data.length > 8 && i % 2 !== 0 && i !== data.length - 1) return null;
                return (
                  <text 
                    key={i} 
                    x={getX(i)} 
                    y={height - 5} 
                    className="fill-gray-400 font-mono text-[9.5px] font-medium" 
                    textAnchor="middle"
                  >
                    {item.label}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>
      );
    }

    // Default Fallback Bar Chart style
    return (
      <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-200/80 space-y-4">
        <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 leading-none">
          <BarChart2 className="w-3.5 h-3.5 text-gray-400" />
          Factor Breakdown Output
        </h5>
        <div className="space-y-3">
          {data.map((item, idx) => {
            const keys = Object.keys(item).filter(k => k !== 'label');
            const primaryKey = keys[0];
            const originalVal = Number(item[primaryKey]);
            
            // Calculate relative maximum span
            const maxOfAll = Math.max(...data.map(d => Number(d[primaryKey]) || 1));
            const fillWidth = Math.max(8, (originalVal / maxOfAll) * 100);

            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">{item.label}</span>
                  <span className="font-mono text-gray-900 font-bold">{originalVal.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden border border-gray-150/80">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${fillWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6" id={`calculator-${utility.id}`}>
      {/* TITLE & HEADER INFOCARDS */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider mb-3.5 shadow-xs ${colors.bg}`}>
              {utility.category === 'finance' && "Finance"}
              {utility.category === 'compliance' && "Compliance"}
              {utility.category === 'data' && "Data Statistics"}
              {utility.category === 'privacy' && "Privacy"}
              {utility.category === 'real_estate' && "Property"}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{utility.name}</h1>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{utility.purpose}</p>
          </div>
          <button 
            onClick={handleReset}
            className="self-start px-4 py-2 bg-[#fcfcfc] border border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-500 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-all active:scale-95 shadow-sm select-none"
            title="Restore original parameter defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restore Defaults
          </button>
        </div>

        {/* LOGIC CONTEXT SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-150 flex gap-3">
            <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">Business Context</h4>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{utility.context}</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-150 flex gap-3">
            <Calculator className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">Formula Definition</h4>
              <p className="text-xs text-gray-700 mt-1.5 font-mono bg-white px-2 py-1 rounded inline-block select-all leading-tight border border-gray-200 shadow-2xs">
                {utility.formulaDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* INPUT FORM & CALCULATION RESULT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COMPONENT: DYNAMIC PARAMETER OUTPUT */}
        <div className="lg:col-span-6 bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.02)] space-y-6">
          <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2 font-mono">
            <Calculator className="w-4.5 h-4.5 text-gray-450" />
            Modifier Parameters
          </h3>

          <div className="space-y-5">
            {utility.inputs.map(input => {
              const currentVal = formValues[input.name];
              if (currentVal === undefined) return null;

              return (
                <div key={input.name} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor={input.name} className="block text-xs font-semibold text-gray-750 capitalize">
                      {input.label}
                    </label>
                    {input.type === 'number' && (
                      <span className="text-2xs font-mono font-bold text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
                        {currentVal}
                      </span>
                    )}
                  </div>

                  {/* NUMBER SLIDERS */}
                  {input.type === 'number' && (
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        id={`${input.name}-slider`}
                        min={input.min ?? 0}
                        max={input.max ?? 500000}
                        step={input.step ?? 1}
                        value={currentVal}
                        onChange={(e) => handleInputChange(input.name, e.target.value)}
                        className="flex-1 accent-blue-600 bg-gray-100 rounded-lg h-1.5 cursor-pointer border border-gray-200"
                      />
                      <input
                        type="number"
                        id={input.name}
                        value={currentVal}
                        onChange={(e) => handleInputChange(input.name, e.target.value)}
                        className="w-20 px-2.5 py-1 text-gray-900 text-xs text-right font-mono font-medium rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  )}

                  {/* BOOLEAN TOGGLES */}
                  {input.type === 'boolean' && (
                    <div className="flex items-center gap-3 bg-gray-50 px-3.5 py-2.5 rounded-xl border border-gray-150">
                      <button
                        type="button"
                        id={input.name}
                        onClick={() => handleInputChange(input.name, !currentVal)}
                        className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${currentVal ? 'bg-blue-600' : 'bg-gray-200'}`}
                        aria-pressed={currentVal}
                      >
                        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${currentVal ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                      <span className="text-gray-600 font-sans text-xs font-semibold select-none cursor-pointer" onClick={() => handleInputChange(input.name, !currentVal)}>
                        {currentVal ? 'Active / Enabled' : 'Inactive / Disabled'}
                      </span>
                    </div>
                  )}

                  {/* DROPDOWN SELECT OPTIONS */}
                  {input.type === 'select' && (
                    <select
                      id={input.name}
                      value={currentVal}
                      onChange={(e) => handleInputChange(input.name, e.target.value)}
                      className="w-full px-3.5 py-2 text-xs text-gray-800 bg-white font-medium rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all cursor-pointer"
                    >
                      {input.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  )}

                  {/* RAW TEXT FIELD INPUT */}
                  {input.type === 'text' && (
                    <textarea
                      id={input.name}
                      value={currentVal}
                      rows={3}
                      onChange={(e) => handleInputChange(input.name, e.target.value)}
                      className="w-full px-3.5 py-2.5 text-gray-800 text-xs rounded-xl bg-white border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all placeholder-gray-400 leading-relaxed font-mono"
                      placeholder="Input custom script parameters..."
                    />
                  )}

                  <p className="text-2xs text-gray-450 mt-1 leading-normal font-medium">{input.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COMPONENT: LIVE OUTPUT RENDERING ENGINE */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.02)] space-y-6">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2 font-mono">
              <Play className="w-4.5 h-4.5 text-gray-450" />
              Live Output Metrics
            </h3>

            {calcResult ? (
              <div className="space-y-6">
                {/* METRICS HEADER CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {calcResult.metrics.map((metric, idx) => {
                    const pillCol = 
                      metric.rating === 'success' ? 'bg-emerald-50 border-emerald-250 text-emerald-700' :
                      metric.rating === 'warning' ? 'bg-amber-50 border-amber-250 text-amber-750' :
                      metric.rating === 'error' ? 'bg-rose-50 border-rose-250 text-rose-700' :
                      metric.rating === 'info' ? 'bg-blue-50 border-blue-250 text-blue-700' :
                      'bg-gray-50 border-gray-200 text-gray-750';

                    return (
                      <div key={idx} className="p-4 bg-gray-50/50 rounded-2xl border border-gray-200/80 flex flex-col justify-between gap-1 shadow-2xs">
                        <span className="text-2xs font-semibold text-gray-400 uppercase tracking-wider leading-none font-mono">
                          {metric.label}
                        </span>
                        <span className={`text-sm sm:text-base font-bold font-mono truncate mt-1 ${pillCol} px-2.5 py-0.5 rounded-lg border w-fit leading-none`}>
                          {metric.value}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* COMPUTED SUMMARY */}
                <div className="p-4 bg-blue-50/10 rounded-2xl border border-dashed border-blue-200/60 flex gap-3 items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-2xs font-semibold text-gray-450 uppercase tracking-wider font-mono">Formula Output Summary</h4>
                    <p className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed mt-1">
                      {calcResult.summary}
                    </p>
                  </div>
                </div>

                {/* VISUAL CHART AREA */}
                {renderVisualizer()}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-14 text-center space-y-3 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
                <Calculator className="w-10 h-10 text-gray-400 animate-pulse" />
                <p className="text-xs text-gray-400 font-medium">Computing live logic matrices...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQs SECTION FOR FRACTIONAL EXECUTIVE COST MODELER */}
      {utility.id === 1 && <FractionalFaq />}

      {/* FOOTER: LLM DISCOVERY INFORMATION */}
      <AeoPerformance utility={utility} />
    </div>
  );
}
