import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const DTITool: React.FC = () => {
  const [income, setIncome] = useState<number>(15000000);
  const [currentDebt, setCurrentDebt] = useState<number>(2000000); // Existing monthly obligations
  const [newLoanPayment, setNewLoanPayment] = useState<number>(1500000); // Estimated new loan payment

  const calculateDTI = () => {
    const totalDebt = currentDebt + newLoanPayment;
    const dti = income > 0 ? (totalDebt / income) * 100 : 0;
    return parseFloat(dti.toFixed(2));
  };

  const dti = calculateDTI();
  
  let statusColor = '#22c55e'; // Green
  let statusText = 'An toàn';
  let recommendation = 'Khách hàng có khả năng trả nợ tốt. Phù hợp hầu hết các dự án (VIB, FE, Shinhan).';

  if (dti > 70) {
    statusColor = '#ef4444'; // Red
    statusText = 'Rủi ro cao';
    recommendation = 'DTI quá cao. Khả năng từ chối cao. Nên tư vấn giảm khoản vay hoặc tất toán nợ cũ.';
  } else if (dti > 45) {
    statusColor = '#f59e0b'; // Orange
    statusText = 'Cảnh báo';
    recommendation = 'Cần cân nhắc kỹ. Nên hướng sang các dòng vay linh hoạt (FE Credit, HomeCredit, MFast).';
  }

  const chartData = [
    { name: 'Dư nợ', value: currentDebt + newLoanPayment },
    { name: 'Thu nhập còn lại', value: income - (currentDebt + newLoanPayment) },
  ];

  const COLORS = [statusColor, '#334155'];

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl">
       <div className="flex items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Công cụ tính DTI</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-gray-400 mb-1">Tổng thu nhập tháng (VNĐ)</label>
            <input 
              type="number" 
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-finz-accent focus:ring-1 focus:ring-finz-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-gray-400 mb-1">Trả nợ hiện tại (VNĐ/tháng)</label>
            <input 
              type="number" 
              value={currentDebt}
              onChange={(e) => setCurrentDebt(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-finz-accent focus:ring-1 focus:ring-finz-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-gray-400 mb-1">Trả nợ khoản vay mới (Dự kiến)</label>
            <input 
              type="number" 
              value={newLoanPayment}
              onChange={(e) => setNewLoanPayment(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-finz-accent focus:ring-1 focus:ring-finz-accent"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="text-center mt-2">
            <p className="text-slate-500 dark:text-gray-400 text-sm">Tỷ lệ nợ/thu nhập</p>
            <div className="text-4xl font-bold mt-1" style={{ color: statusColor }}>{dti}%</div>
            <div className="flex items-center justify-center mt-2 font-medium" style={{ color: statusColor }}>
              {dti > 45 ? <AlertTriangle className="w-4 h-4 mr-1" /> : <CheckCircle className="w-4 h-4 mr-1" />}
              {statusText}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-slate-100 dark:bg-slate-900/60 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
        <h4 className="text-finz-accent font-semibold mb-2 flex items-center">
          <span className="w-2 h-2 bg-finz-accent rounded-full mr-2"></span>
          Đánh giá & Gợi ý
        </h4>
        <p className="text-slate-600 dark:text-gray-300 text-sm">{recommendation}</p>
      </div>
    </div>
  );
};

export default DTITool;