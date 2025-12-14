import React, { useState } from 'react';
import { Calculator, Download, Share2 } from 'lucide-react';

const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(50000000);
  const [tenure, setTenure] = useState<number>(12);
  const [rate, setRate] = useState<number>(1.66); // Monthly rate %
  const [salary, setSalary] = useState<number>(10000000);
  
  const calculateLoan = () => {
    const r = rate / 100;
    const emi = (amount * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1);
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - amount;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest)
    };
  };

  const result = calculateLoan();

  const handleExport = () => {
    alert("Tính năng xuất phiếu PDF đang được phát triển!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-finz-accent/20 rounded-lg mr-4">
          <Calculator className="w-6 h-6 text-finz-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Máy tính tín chấp</h2>
          <p className="text-sm text-slate-500 dark:text-gray-400">Ước tính khoản vay và lịch trả nợ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-gray-400 mb-1">Thu nhập (VNĐ)</label>
            <input 
              type="number" 
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-finz-accent focus:ring-1 focus:ring-finz-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-gray-400 mb-1">Số tiền vay (VNĐ)</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-finz-accent focus:ring-1 focus:ring-finz-accent"
            />
            <input 
              type="range" min="10000000" max="500000000" step="1000000"
              value={amount} onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full mt-2 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-finz-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-gray-400 mb-1">Thời hạn (Tháng): {tenure}</label>
            <input 
              type="range" min="6" max="60" step="6"
              value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-finz-highlight"
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-gray-500 mt-1">
              <span>6 tháng</span>
              <span>60 tháng</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-gray-400 mb-1">Lãi suất (%/tháng)</label>
            <input 
              type="number" step="0.01"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-finz-accent focus:ring-1 focus:ring-finz-accent"
            />
          </div>
        </div>

        <div className="bg-slate-100 dark:bg-slate-900/80 rounded-xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col justify-center h-full transition-colors">
          <h3 className="text-slate-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Kết quả ước tính</h3>
          
          <div className="mb-6">
            <p className="text-sm text-slate-500 dark:text-gray-400">Trả góp hàng tháng</p>
            <p className="text-3xl font-bold text-finz-accent">{result.emi.toLocaleString()} đ</p>
          </div>

          <div className="space-y-3 border-t border-gray-300 dark:border-slate-700 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-gray-400">Gốc:</span>
              <span className="text-slate-900 dark:text-white">{amount.toLocaleString()} đ</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-gray-400">Tổng lãi:</span>
              <span className="text-finz-highlight">{result.totalInterest.toLocaleString()} đ</span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-slate-800 dark:text-gray-200">Tổng thanh toán:</span>
              <span className="text-slate-900 dark:text-white">{result.totalPayment.toLocaleString()} đ</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
             <button onClick={handleExport} className="flex items-center justify-center py-2 px-4 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-slate-700 dark:text-white rounded-lg transition-colors text-sm font-medium">
                <Download className="w-4 h-4 mr-2" /> Xuất phiếu
             </button>
             <button className="flex items-center justify-center py-2 px-4 bg-finz-accent hover:bg-sky-600 text-white rounded-lg transition-colors text-sm font-medium shadow-md">
                <Share2 className="w-4 h-4 mr-2" /> Gửi khách
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;