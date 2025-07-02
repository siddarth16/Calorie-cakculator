import { CalculationResult, UserData } from '../types';

export const generatePDF = (result: CalculationResult, userData: UserData) => {
  // Create a new window with the PDF content
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download the PDF');
    return;
  }

  const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Calorie Calculator Results</title>
      <style>
        body {
          font-family: 'Inter', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #0ea5e9;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #0ea5e9;
          margin: 0;
          font-size: 28px;
        }
        .section {
          margin-bottom: 30px;
        }
        .section h2 {
          color: #0ea5e9;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .result-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .result-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
        }
        .result-value {
          font-size: 24px;
          font-weight: bold;
          color: #0ea5e9;
          margin: 10px 0;
        }
        .recommendations {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .recommendation-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e0f2fe;
        }
        .recommendation-item:last-child {
          border-bottom: none;
        }
        .weight-loss {
          border-left: 4px solid #22c55e;
          padding-left: 15px;
          margin: 15px 0;
        }
        .weight-gain {
          border-left: 4px solid #f59e0b;
          padding-left: 15px;
          margin: 15px 0;
        }
        .info-box {
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Calorie Calculator Results</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
      </div>

      <div class="section">
        <h2>Personal Information</h2>
        <p><strong>Name:</strong> ${userData.name || 'Not provided'}</p>
        <p><strong>Age:</strong> ${userData.age} years</p>
        <p><strong>Gender:</strong> ${userData.gender}</p>
        <p><strong>Height:</strong> ${userData.height} ${userData.heightUnit}</p>
        <p><strong>Weight:</strong> ${userData.weight} ${userData.weightUnit}</p>
      </div>

      <div class="section">
        <h2>Calculation Results</h2>
        <div class="result-grid">
          <div class="result-card">
            <div>Basal Metabolic Rate (BMR)</div>
            <div class="result-value">${result.bmr.toLocaleString()}</div>
            <div>calories/day</div>
          </div>
          <div class="result-card">
            <div>Total Daily Energy Expenditure (TDEE)</div>
            <div class="result-value">${result.tdee.toLocaleString()}</div>
            <div>calories/day</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Calorie Recommendations</h2>
        <div class="recommendations">
          <div class="weight-loss">
            <h3>Weight Loss Recommendations</h3>
            <div class="recommendation-item">
              <span>Mild (0.5 lb/week):</span>
              <strong>${result.recommendations.mild_loss.toLocaleString()} calories</strong>
            </div>
            <div class="recommendation-item">
              <span>Moderate (1 lb/week):</span>
              <strong>${result.recommendations.moderate_loss.toLocaleString()} calories</strong>
            </div>
            <div class="recommendation-item">
              <span>Aggressive (1.5 lb/week):</span>
              <strong>${result.recommendations.aggressive_loss.toLocaleString()} calories</strong>
            </div>
          </div>

          <div class="weight-gain">
            <h3>Weight Gain Recommendations</h3>
            <div class="recommendation-item">
              <span>Mild (0.5 lb/week):</span>
              <strong>${result.recommendations.mild_gain.toLocaleString()} calories</strong>
            </div>
            <div class="recommendation-item">
              <span>Moderate (1 lb/week):</span>
              <strong>${result.recommendations.moderate_gain.toLocaleString()} calories</strong>
            </div>
            <div class="recommendation-item">
              <span>Aggressive (1.5 lb/week):</span>
              <strong>${result.recommendations.aggressive_gain.toLocaleString()} calories</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Summary</h2>
        <p>${result.summary}</p>
      </div>

      <div class="info-box">
        <h3>Important Notes</h3>
        <ul>
          <li>These calculations are estimates based on the Mifflin-St Jeor formula</li>
          <li>Individual results may vary based on genetics, medical conditions, and other factors</li>
          <li>Start with mild recommendations and adjust based on your progress</li>
          <li>Combine with regular exercise for optimal results</li>
          <li>Consult a healthcare professional for personalized advice</li>
        </ul>
      </div>

      <div class="footer">
        <p>Generated by Calorie Calculator</p>
        <p>For more information and tools, visit our website</p>
      </div>

      <div class="no-print" style="text-align: center; margin-top: 30px;">
        <button onclick="window.print()" style="
          background: #0ea5e9;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
        ">
          Print / Save as PDF
        </button>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(content);
  printWindow.document.close();
}; 