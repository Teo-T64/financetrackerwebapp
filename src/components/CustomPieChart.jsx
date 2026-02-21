import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CustomPieChart = ({ data, totalAmount, label, colors, showTextAnchor = true }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative h-62.5 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="amount"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]} 
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {showTextAnchor && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs font-medium text-slate-500 uppercase">
              {label}
            </span>
            <span className="text-2xl font-bold text-slate-900">
              {totalAmount}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-sm font-medium text-slate-600">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;