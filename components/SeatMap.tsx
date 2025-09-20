
import React, { useState, useEffect, useMemo } from 'react';
import { Seat, SeatStatus } from '../types';
import { TICKET_PRICES } from '../contexts/BookingContext';

interface SeatMapProps {
  occupiedSeats: string[];
  onSeatSelectionChange: (selectedSeats: Seat[]) => void;
}

const generateSeats = (): Seat[] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = 12;
  const seats: Seat[] = [];
  rows.forEach(row => {
    for (let i = 1; i <= cols; i++) {
      const id = `${row}${i}`;
      let status = SeatStatus.Available;
      if (row === 'G' || row === 'H') {
        status = SeatStatus.VIP;
      }
      if ((row === 'H') && (i > 4 && i < 9)) {
        status = SeatStatus.Couple;
      }
      seats.push({ id, status });
    }
  });
  return seats;
};

const SeatComponent: React.FC<{ seat: Seat; onSelect: (id: string) => void; isSelected: boolean }> = ({ seat, onSelect, isSelected }) => {
  const getSeatClasses = () => {
    let base = "w-6 h-6 md:w-8 md:h-8 m-1 rounded-md cursor-pointer transition-all duration-200 flex items-center justify-center text-xs font-bold";
    if (seat.status === SeatStatus.Occupied) {
      return `${base} bg-gray-600 cursor-not-allowed`;
    }
    if (isSelected) {
      return `${base} bg-brand-red text-white scale-110`;
    }
    switch (seat.status) {
      case SeatStatus.VIP:
        return `${base} bg-yellow-500 hover:bg-yellow-400`;
      case SeatStatus.Couple:
        return `${base} bg-pink-500 hover:bg-pink-400 w-14 md:w-20`;
      case SeatStatus.Available:
      default:
        return `${base} bg-gray-800 hover:bg-gray-700`;
    }
  };

  return (
    <button
      className={getSeatClasses()}
      onClick={() => onSelect(seat.id)}
      disabled={seat.status === SeatStatus.Occupied}
    >
      {seat.id}
    </button>
  );
};

const SeatMap: React.FC<SeatMapProps> = ({ occupiedSeats, onSeatSelectionChange }) => {
  const initialSeats = useMemo(() => {
    return generateSeats().map(seat => 
      occupiedSeats.includes(seat.id) ? { ...seat, status: SeatStatus.Occupied } : seat
    );
  }, [occupiedSeats]);

  const [seats, setSeats] = useState<Seat[]>(initialSeats);
  const [selectedSeatIds, setSelectedSeatIds] = useState<Set<string>>(new Set());

  const legendItems = [
    { status: SeatStatus.Available, color: 'bg-gray-800', name: 'Standard' },
    { status: SeatStatus.VIP, color: 'bg-yellow-500', name: 'VIP' },
    { status: SeatStatus.Couple, color: 'bg-pink-500', name: 'Couple' },
    { status: SeatStatus.Selected, color: 'bg-brand-red', name: 'Selected' },
    { status: SeatStatus.Occupied, color: 'bg-gray-600', name: 'Occupied' },
  ];

  const handleSeatSelect = (id: string) => {
    const newSelectedIds = new Set(selectedSeatIds);
    if (newSelectedIds.has(id)) {
      newSelectedIds.delete(id);
    } else {
      newSelectedIds.add(id);
    }
    setSelectedSeatIds(newSelectedIds);
  };

  useEffect(() => {
    const selected = seats.filter(seat => selectedSeatIds.has(seat.id));
    onSeatSelectionChange(selected);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeatIds, seats]);

  return (
    <div className="p-4 bg-black rounded-lg">
      <div className="mb-4 bg-gray-700 h-2 w-3/4 mx-auto rounded-full screen-shadow" style={{ boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.3)'}}></div>
      <p className="text-center text-gray-400 mb-6">SCREEN</p>
      
      <div className="flex flex-col items-center">
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(row => (
          <div key={row} className="flex justify-center items-center">
            <span className="w-6 text-center mr-2 text-gray-400">{row}</span>
            {seats.filter(s => s.id.startsWith(row)).map(seat => (
              seat.status === SeatStatus.Couple && parseInt(seat.id.substring(1)) % 2 !== 1 && parseInt(seat.id.substring(1)) > 5 ? null :
              <SeatComponent
                key={seat.id}
                seat={seat}
                isSelected={selectedSeatIds.has(seat.id)}
                onSelect={handleSeatSelect}
              />
            ))}
            <span className="w-6 text-center ml-2 text-gray-400">{row}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-700 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6 text-sm">
        {legendItems.map(item => (
          <div key={item.name} className="flex items-center space-x-2">
            <div className={`w-5 h-5 rounded ${item.color}`}></div>
            <div>
              <span className="block font-semibold">{item.name}</span>
              {(item.status === SeatStatus.Available || item.status === SeatStatus.VIP || item.status === SeatStatus.Couple) && TICKET_PRICES[item.status] > 0 ? (
                 <span className="block text-xs text-gray-400">
                     {TICKET_PRICES[item.status].toLocaleString('vi-VN')} VND
                 </span>
              ) : null }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
