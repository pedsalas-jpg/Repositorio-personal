import React, { useState, useEffect } from 'react';
import { Dumbbell, Plus, Trash2, Calendar, HardDrive } from 'lucide-react';

export default function App() {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('gym_tracker_data');
    return saved ? JSON.parse(saved) : [];
  });

  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  useEffect(() => {
    localStorage.setItem('gym_tracker_data', JSON.stringify(workouts));
  }, [workouts]);

  const addWorkout = (e) => {
    e.preventDefault();
    if (!exercise || !weight || !reps) return;

    const newWorkout = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-ES'),
      exercise,
      weight: Number(weight),
      reps: Number(reps)
    };

    setWorkouts([newWorkout, ...workouts]);
    setExercise('');
    setWeight('');
    setReps('');
  };

  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter(w => w.id !== id));
  };

  return (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Dumbbell size={32} color="#3b82f6" />
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Gym Tracker</h1>
        </header>

        {/* Formulario para registrar ejercicio */}
        <form onSubmit={addWorkout} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px' }}>
          <input
              type="text"
              placeholder="Nombre del ejercicio (ej. Press Banca)"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
                type="number"
                placeholder="Peso (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
            <input
                type="number"
                placeholder="Repeticiones"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>
          <button
              type="submit"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            <Plus size={18} /> Registrar Serie
          </button>
        </form>

        {/* Lista de Registros */}
        <section>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Historial</h2>
          {workouts.length === 0 ? (
              <p style={{ color: '#666', fontSize: '0.9rem' }}>No hay ejercicios registrados aún.</p>
          ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {workouts.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                      <div>
                        <strong style={{ display: 'block' }}>{item.exercise}</strong>
                        <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                    <Calendar size={12} inline style={{ marginRight: '4px' }} />
                          {item.date} — {item.weight} kg x {item.reps} reps
                  </span>
                      </div>
                      <button
                          onClick={() => deleteWorkout(item.id)}
                          style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                ))}
              </div>
          )}
        </section>
      </div>
  );
}