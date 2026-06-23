'react'; // Next.js Client Component
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('processing');
  const [importText, setImportText] = useState("");
  const [detectedNames, setDetectedNames] = useState([]);
  
  // 1. አዲስ፡ የተመረጠውን ኦፊሰር ለመያዝ የተጨመረ State
  const [selectedOfficer, setSelectedOfficer] = useState("");

  // የኦፊሰሮች ዝርዝር ናሙና
  const officersList = [
    "Kidusyared Liku",
    "Abebe Kebede",
    "Aster Chaltu",
    "Marta Alemu"
  ];

  // በሲስተሙ ላይ ያሉ የደንበኛ ሪከርድ ቁጥሮች ናሙና
  const [counts] = useState({
    processing: 5,
    waiting: 6,
    no_response: 1,
    completed: 59,
    rejected: 3
  });

  // ስማርት ኢምፖርተር፡ ጽሁፍ ሲገባ ስሞችን በራሱ የሚለይበት ፈጣን ፈንክሽን
  const handleSmartImport = (text) => {
    setImportText(text);
    if (!text.trim()) {
      setDetectedNames([]);
      return;
    }
    
    // በናሙናነት በድርጅቱ ውስጥ ያሉ የተለመዱ ስሞችን መፈለግ (ለምሳሌ Kalkidan)
    const commonNames = ["Kalkidan", "Abebe", "Kebede", "Chaltu", "Aster"];
    const found = commonNames.filter(name => 
      text.toLowerCase().includes(name.toLowerCase())
    );
    setDetectedNames(found);
  };

  // 2. ተጠቃሚው (Officer) ገና ካልመረጠ መጀመሪያ ይህ የ Dropdown መምረጫ ገጽ ይታያል
  if (!selectedOfficer) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100 font-sans antialiased p-4">
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-md max-w-md w-full space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-purple-900">Digaf MFI Terminal</h2>
            <p className="text-xs text-slate-400 mt-1">እባክዎ መጀመሪያ ተጠቃሚ (Officer) ይምረጡ</p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="officer-select" className="text-xs font-bold text-slate-600 uppercase tracking-wide">
              የኦፊሰር ስም / Officer Name
            </label>
            <select
              id="officer-select"
              onChange={(e) => setSelectedOfficer(e.target.value)}
              defaultValue=""
              className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-purple-500 shadow-sm"
            >
              <option value="" disabled hidden>-- ኦፊሰር ይምረጡ --</option>
              {officersList.map((officer, index) => (
                <option key={index} value={officer}>
                  {officer}
                </option>
              ))}
            </select>
          </div>
          
          <p className="text-[10px] text-center text-slate-400 leading-relaxed">
            Secure workstation terminal login. Actions performed here will be bound to the selected identity.
          </p>
        </div>
      </div>
    );
  }

  // 3. ኦፊሰር ከተመረጠ በኋላ ይህ ዋናው ሲስተም ይከፈታል
  return (
    <div className="flex h-screen bg-slate-100 font-sans antialiased">
      {/* የጎን ማውጫ */}
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} counts={counts} />

      {/* ዋናው ገጽ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* የነበረው ቋሚ ስም በተመረጠው ኦፊሰር (selectedOfficer) ተተክቷል */}
        <Header activeOfficer={selectedOfficer} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {currentTab === 'processing' && (
            <div className="space-y-6">
              {/* Workflow Warning */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-sm font-bold text-purple-900 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  <span>Workflow Management Console</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                  Secure workstation terminal bound directly to this PC. Actions are permanent and non-repudiable. 
                  እያንዳንዱ የምታሳልፈው ውሳኔ በአንተ ስም (<span className="font-bold text-purple-700">{selectedOfficer}</span>) በቋሚነት ይመዘገባል።
                </p>
              </div>

              {/* RENEWAL PROCESSING SECTION */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Renewal Processing</h3>
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-md">
                      {counts.processing} Records
                    </span>
                  </div>
                  
                  <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-bold text-slate-500">
                    <button className="bg-white text-slate-800 px-3 py-1.5 rounded-md shadow-sm">PIPELINE CARDS</button>
                    <button className="px-3 py-1.5 rounded-md">LEDGER TABLE</button>
                  </div>
                </div>

                {/* SMART IMPORTER BOX */}
                <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">🔮 Smart Importer</span>
                    {detectedNames.length > 0 && (
                      <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {detectedNames.length} Names Detected
                      </span>
                    )}
                  </div>
                  
                  <div className="relative">
                    <textarea 
                      value={importText}
                      onChange={(e) => handleSmartImport(e.target.value)}
                      placeholder="እዚህ ላይ የደንበኛ መረጃዎችን ኮፒ አድርገህ አምጣ... (ለምሳሌ: Kalkidan pay day)"
                      className="w-full h-20 p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-purple-500 font-mono resize-none"
                    />
                    {importText && (
                      <button 
                        onClick={() => handleSmartImport("")}
                        className="absolute bottom-3 right-3 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs px-2.5 py-1 rounded font-bold transition-all"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  {/* REGISTERED PORTFOLIO MATCHES */}
                  {detectedNames.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-amber-800 font-medium">
                        <span>⚠️ Registered Portfolio Matches ({detectedNames.length})</span>
                        <span className="bg-white px-1.5 py-0.5 rounded border border-amber-200 font-mono font-bold">
                          {detectedNames.join(", ")}
                        </span>
                      </div>
                      <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        Verification Check
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentTab !== 'processing' && (
            <div className="text-center py-20 text-slate-400 text-sm">
              ይህ "{currentTab}" ክፍል በደረጃ 2 ላይ ከዳታቤዝ ጋር ተያይዞ የሚሰራ ይሆናል።
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
