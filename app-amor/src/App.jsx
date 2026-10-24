import { useState, useEffect } from 'react';
import { Heart, Utensils, Film, Coffee, Gift } from 'lucide-react';

export default function App() {
    const [tiempo, setTiempo] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
    const [cupones, setCupones] = useState([
        { id: 1, texto: "Vale por una cena romántica", icono: <Utensils size={28} />, usado: false },
        { id: 2, texto: "Vale por tarde de películas", icono: <Film size={28} />, usado: false },
        { id: 3, texto: "Vale por un masaje relajante", icono: <Heart size={28} />, usado: false },
        { id: 4, texto: "Vale por un desayuno sorpresa", icono: <Coffee size={28} />, usado: false },
    ]);

    const fechaAniversario = new Date(2024, 8, 21);

    useEffect(() => {
        const actualizarContador = () => {
            const ahora = new Date();
            const diferencia = ahora - fechaAniversario;
            setTiempo({
                dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
                horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
                minutos: Math.floor((diferencia / 1000 / 60) % 60),
                segundos: Math.floor((diferencia / 1000) % 60)
            });
        };
        actualizarContador();
        const intervalo = setInterval(actualizarContador, 1000);
        return () => clearInterval(intervalo);
    }, []);

    const canjearCupon = (id) => {
        setCupones(cupones.map(cupon =>
            cupon.id === id ? { ...cupon, usado: true } : cupon
        ));
    };

    return (
        <div style={{ padding: '2rem 1rem', fontFamily: 'sans-serif', backgroundColor: '#fff0f3', minHeight: '100vh', textAlign: 'center' }}>

            <Heart fill="#ff4d4d" color="#ff4d4d" size={50} style={{ margin: '0 auto', marginBottom: '1rem' }} />

            <img
                src="/nosotros.jpg"
                alt="Nuestra foto"
                style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    margin: '0 auto 1rem auto',
                    border: '4px solid #ff7675',
                    display: 'block'
                }}
            />

            <h1 style={{ color: '#d63031', fontSize: '1.8rem', margin: '0' }}>Nuestro Tiempo Juntos</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem', color: '#2d3436' }}>
                <div><strong style={{ fontSize: '1.8rem' }}>{tiempo.dias}</strong><br/>Días</div>
                <div><strong style={{ fontSize: '1.8rem' }}>{tiempo.horas}</strong><br/>Hrs</div>
                <div><strong style={{ fontSize: '1.8rem' }}>{tiempo.minutos}</strong><br/>Min</div>
                <div><strong style={{ fontSize: '1.8rem' }}>{tiempo.segundos}</strong><br/>Seg</div>
            </div>

            <hr style={{ border: 'none', borderTop: '2px dashed #ffb8b8', margin: '3rem 0' }} />

            <h2 style={{ color: '#d63031', marginBottom: '2rem' }}><Gift size={24} style={{ verticalAlign: 'middle', marginRight: '8px' }}/> Cupones Canjeables</h2>
            <div style={{ display: 'grid', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
                {cupones.map((cupon) => (
                    <div
                        key={cupon.id}
                        onClick={() => !cupon.usado && canjearCupon(cupon.id)}
                        style={{
                            backgroundColor: cupon.usado ? '#f1f2f6' : '#ffffff',
                            color: cupon.usado ? '#a4b0be' : '#2f3640',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            boxShadow: cupon.usado ? 'none' : '0 4px 6px rgba(255, 118, 117, 0.2)',
                            cursor: cupon.usado ? 'default' : 'pointer',
                            border: cupon.usado ? '2px solid #dfe4ea' : '2px solid #ff7675',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                    >
                        <div style={{ color: cupon.usado ? '#ced6e0' : '#ff7675' }}>{cupon.icono}</div>
                        <div style={{ flex: 1, textAlign: 'left', fontWeight: 'bold' }}>
                            {cupon.texto}
                            {cupon.usado && <div style={{ fontSize: '0.8rem', color: '#ff4757', marginTop: '4px' }}>¡Canjeado!</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}