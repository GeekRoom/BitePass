import React, { useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";
import { X, Check, QrCode } from "lucide-react";
import api from "../utils/api";
import { toast } from "react-hot-toast";

const QRScannerModal = ({ onClose, eventId, activeMeal, onChangeMeal }) => {
  const [history, setHistory] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  
  // Refs to avoid recreating handleScan and restarting the camera
  const scanningRef = React.useRef(false);
  const activeMealRef = React.useRef(activeMeal);
  const eventIdRef = React.useRef(eventId);

  useEffect(() => {
    activeMealRef.current = activeMeal;
    eventIdRef.current = eventId;
  }, [activeMeal, eventId]);
  
  const handleScan = React.useCallback(async (data) => {
    if (data && !scanningRef.current) {
      scanningRef.current = true;
      setScanning(true);
      const tokenId = data.text || data;
      
      try {
        // Vibrate and Sound
        if (navigator.vibrate) navigator.vibrate(50);
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
        audio.play().catch(() => {});

        const res = await api.post("/participants/scan", {
          event_id: eventIdRef.current,
          meal_id: activeMealRef.current?.meal_id,
          token_id: tokenId
        });

        const newEntry = {
          id: Date.now(),
          name: res.data.name || "Member",
          team: res.data.team_name || tokenId,
          time: new Date().toLocaleTimeString(),
          success: true
        };
        
        setHistory(prev => [newEntry, ...prev].slice(0, 5));
        toast.success(`Success: ${res.data.name || "Member"}`);
        setScanResult("success");
        
        setTimeout(() => {
          setScanning(false);
          setScanResult(null);
          scanningRef.current = false;
        }, 1500);
      } catch (err) {
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        const errorMsg = err.response?.data?.error || err.response?.data?.message || "Scan Failed";
        const newEntry = {
          id: Date.now(),
          name: "Error",
          team: errorMsg,
          time: new Date().toLocaleTimeString(),
          success: false
        };
        setHistory(prev => [newEntry, ...prev].slice(0, 5));
        toast.error(errorMsg);
        setScanResult("error");
        setTimeout(() => {
          setScanning(false);
          setScanResult(null);
          scanningRef.current = false;
        }, 2000);
      }

    }
  }, []);

  const handleError = React.useCallback((err) => {
    console.error("QR Scanner Error:", err);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative bg-[#0d0d1a] border border-white/10 rounded-[2rem] p-8 shadow-2xl w-full max-w-4xl overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#7F5AF0]/20 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#C77DFF]/20 blur-[100px] rounded-full"></div>

        <div className="relative flex flex-col md:flex-row gap-8">
          {/* Left Column: Scanner */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C77DFF]">Current Session</span>
                <button 
                  onClick={onChangeMeal}
                  className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition bg-white/5 px-3 py-1 rounded-full border border-white/10"
                >
                  Change
                </button>
              </div>
              <h2 className="text-3xl font-black text-white mb-2 truncate">
                {activeMeal?.meal_name || "General Session"}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#7F5AF0] to-[#C77DFF] rounded-full"></div>
            </div>

            <div className="relative w-full aspect-square max-w-[400px] overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-inner flex items-center justify-center">
              <QrScanner
                delay={300}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                onError={handleError}
                onScan={handleScan}
                constraints={{ video: { facingMode: "environment" } }}
              />
              
              {/* Scan Overlay */}
              <div className="absolute inset-0 pointer-events-none border-[20px] border-[#0d0d1a]/60"></div>
              <div className="absolute inset-[20px] border-2 border-white/5 rounded-2xl pointer-events-none"></div>
              
              {/* Scanning indicator */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-64 h-64 border-2 border-[#7F5AF0]/40 rounded-3xl transition-transform duration-500 ${scanning ? 'scale-110' : 'scale-100'} ${scanResult === 'success' ? 'border-green-500/60' : scanResult === 'error' ? 'border-red-500/60' : ''}`}></div>
                <div className="absolute w-[200px] h-[2px] bg-[#7F5AF0]/60 blur-sm animate-pulse shadow-[0_0_15px_rgba(127,90,240,0.8)]"></div>
              </div>

              {scanResult === 'success' && (
                <div className="absolute inset-0 bg-green-500/10 backdrop-blur-[2px] flex items-center justify-center pointer-events-none animate-in fade-in duration-300">
                  <div className="bg-green-500 p-4 rounded-full shadow-[0_0_30px_rgba(34,197,94,0.6)]">
                    <Check size={48} className="text-white" strokeWidth={3} />
                  </div>
                </div>
              )}
              {scanResult === 'error' && (
                <div className="absolute inset-0 bg-red-500/10 backdrop-blur-[2px] flex items-center justify-center pointer-events-none animate-in fade-in duration-300">
                  <div className="bg-red-500 p-4 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.6)]">
                    <X size={48} className="text-white" strokeWidth={3} />
                  </div>
                </div>
              )}
            </div>

            <p className="mt-4 text-white/30 text-[10px] font-medium tracking-widest uppercase">
              Position QR code within frame
            </p>
          </div>

          {/* Right Column: History & Stats */}
          <div className="w-full md:w-[320px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#C77DFF]">Scan Logs</h3>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-2 max-h-[400px] min-h-[300px] scrollbar-hide">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 border border-dashed border-white/5 rounded-[2rem]">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 text-white/20">
                    <QrCode size={24} />
                  </div>
                  <p className="text-white/20 text-xs font-medium">Waiting for first scan...</p>
                </div>
              ) : (
                history.map(item => (
                  <div key={item.id} className={`p-4 rounded-2xl border animate-in slide-in-from-right duration-500 ${item.success ? "bg-white/[0.03] border-white/5" : "bg-red-500/5 border-red-500/10"}`}>
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-sm text-white truncate pr-2">{item.name}</p>
                      <span className="text-[9px] font-bold text-white/20 whitespace-nowrap">{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.success ? 'bg-green-500' : 'bg-red-500'} shadow-[0_0_5px_currentColor]`}></div>
                      <p className={`text-[10px] font-bold tracking-wide truncate ${item.success ? "text-white/40" : "text-red-400"}`}>{item.team}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button onClick={onClose} className="mt-8 w-full py-4 rounded-2xl bg-[#7F5AF0] hover:bg-[#6b48d6] text-white font-bold text-sm shadow-lg shadow-[#7F5AF0]/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Finish Scanning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default QRScannerModal;
