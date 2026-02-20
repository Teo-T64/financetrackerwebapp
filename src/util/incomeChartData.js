export function prepareIncomeChartData(transactions) {
  if (!transactions || !Array.isArray(transactions)) return [];

  const grouped = Object.groupBy(transactions, (item) => item.date || "Unknown");

  return Object.entries(grouped)
    .filter(([key]) => key !== "Unknown")
    .map(([dateKey, items]) => {
      const [year, month, day] = dateKey.split('-');
      
      const dateObj = new Date(year, month - 1, day || 1);
      const displayDate = dateObj.toLocaleDateString('en-US', {
        day: day ? 'numeric' : undefined,
        month: 'short',
        year: 'numeric'
      });

      return {
        dateKey,
        displayDate, 
        totalAmount: items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0),
        details: items 
      };
    })
    .sort((a, b) => a.dateKey.localeCompare(b.dateKey));
}