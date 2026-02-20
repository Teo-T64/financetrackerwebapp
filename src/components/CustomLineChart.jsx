import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-xl min-w-50">
        <p className="text-sm font-bold text-slate-800 border-b pb-2 mb-2">
          {data.displayDate}
        </p>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {data.details.map((item, index) => (
            <div key={index} className="flex justify-between text-xs gap-4">
              <span className="text-slate-600">{item.name || "Product"}</span>
              <span className="font-medium text-slate-900">${Number(item.amount).toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-dashed flex justify-between text-sm font-bold text-indigo-600">
          <span>Total</span>
          <span>€{data.totalAmount.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

function CustomLineChart({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return <div className="h-full flex items-center justify-center text-slate-400">No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={transactions} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        
        <XAxis 
          dataKey="displayDate" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          padding={{ left: 20, right: 20 }}
        />
        
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          tickFormatter={(val) => `€${val}`}
        />
        
        <Tooltip content={<CustomTooltip />} />
        
        <Line
          type="monotone"
          dataKey="totalAmount"
          stroke="#6366f1"
          strokeWidth={3}
          dot={{ r: 5, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
          activeDot={{ r: 8, fill: '#6366f1' }}
          animationDuration={1000}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default CustomLineChart;