import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, UserCheck, UserX, Coins, ShoppingBag, ArrowRightLeft, Sparkles, 
  RotateCw, PlusCircle, Trash2, CheckCircle, XCircle, LogIn, 
  LogIn as LogInIcon, Eye, Award, Gift, RefreshCw, Search, Layers, 
  ShieldAlert, Check, AlertCircle, HelpCircle, Edit3, Image, Flame, Zap, Wand2,
  Trophy, Sliders, Filter, ArrowRight, HeartHandshake, Info
} from 'lucide-react';

// --- INITIAL MOCK DATA ---
const INITIAL_USERS = [
  { id: 'u1', email: 'admin@locke.tv', name: 'KalosMaster (Admin)', role: 'admin', status: 'approved', 
coins: 10000, inventory: ['card-1', 'card-3'] },
  { id: 'u2', email: 'mod@locke.tv', name: 'GymLeaderMod', role: 'moderator', status: 'approved', coins: 
2500, inventory: ['card-2'] },
  { id: 'u3', email: 'ash@kalos.com', name: 'AshKetchum_XY', role: 'player', status: 'approved', coins: 
850, inventory: ['card-1', 'card-4'] },
  { id: 'u4', email: 'serena@kalos.com', name: 'SerenaPerform', role: 'player', status: 'approved', coins: 
1200, inventory: ['card-2', 'card-3'] },
  { id: 'u5', email: 'newbie@kalos.com', name: 'CalemRival', role: 'player', status: 'pending', coins: 
150, inventory: [] },
  { id: 'u6', email: 'banned@kalos.com', name: 'TeamFlareAdmin', role: 'player', status: 'rejected', 
coins: 0, inventory: [] }
];

const INITIAL_CARDS = [
  { 
    id: 'card-1', 
    name: 'Revivir Máximo Kalos', 
    type: 'Objeto',
    price: 300, 
    stock: 5, 
    description: 'Revive inmediatamente a 1 Pokémon debilitado de tu equipo en Pokémon X/Y.', 
    effect: 'Revive 1 Pokémon fainted',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/max-revive.png', 
    rarity: 'Legendaria',
    bgTheme: 'from-amber-600 via-purple-900 to-indigo-950'
  },
  { 
    id: 'card-2', 
    name: 'Piedra Activadora Mega', 
    type: 'Batalla',
    price: 500, 
    stock: 2, 
    description: 'Permite Mega Evolucionar a un Pokémon durante tu próximo combate de Gimnasio.', 
    effect: '+30% Poder e Inmunidad 1 Combate',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/mega-ring.png', 
    rarity: 'Mega',
    bgTheme: 'from-cyan-500 via-blue-900 to-slate-950'
  },
  { 
    id: 'card-3', 
    name: 'Inmunidad Tipo Hada', 
    type: 'Estado',
    price: 250, 
    stock: 8, 
    description: 'Tus Pokémon son inmunes a ataques superefectivos de Tipo Hada durante 1 ruta.', 
    effect: 'Resistencia total a Tipo Hada',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/pixie-plate.png', 
    rarity: 'Épica',
    bgTheme: 'from-pink-500 via-rose-900 to-purple-950'
  },
  { 
    id: 'card-4', 
    name: 'Captura Master Ball', 
    type: 'Clave',
    price: 400, 
    stock: 3, 
    description: 'Garantiza la captura del primer Pokémon de la siguiente ruta de Kalos sin fallar.', 
    effect: 'Captura 100% Exitosa',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png', 
    rarity: 'Legendaria',
    bgTheme: 'from-purple-600 via-fuchsia-900 to-slate-950'
  }
];

const KALOS_POKEMON_LIST = [
  { name: 'Greninja (Forma Aso)', dex: 658, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/
master/sprites/pokemon/658.png', types: ['Agua', 'Siniestro'] },
  { name: 'Mega Lucario', dex: 448, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/
sprites/pokemon/mega/448-mega.png', types: ['Lucha', 'Acero'] },
  { name: 'Mega Charizard X', dex: 6, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/
sprites/pokemon/mega/6-mega-x.png', types: ['Fuego', 'Dragón'] },
  { name: 'Sylveon', dex: 700, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/
pokemon/700.png', types: ['Hada'] },
  { name: 'Xerneas', dex: 716, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/
pokemon/716.png', types: ['Hada'] },
  { name: 'Yveltal', dex: 717, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/
pokemon/717.png', types: ['Siniestro', 'Volador'] },
  { name: 'Chesnaught', dex: 652, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/
sprites/pokemon/652.png', types: ['Planta', 'Lucha'] },
  { name: 'Delphox', dex: 655, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/
pokemon/655.png', types: ['Fuego', 'Psíquico'] },
  { name: 'Aegislash', dex: 681, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/
pokemon/681.png', types: ['Acero', 'Fantasma'] },
  { name: 'Talonflame', dex: 663, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/
sprites/pokemon/663.png', types: ['Fuego', 'Volador'] },
  { name: 'Goodra', dex: 706, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/
pokemon/706.png', types: ['Dragón'] },
  { name: 'Hawlucha', dex: 701, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/
pokemon/701.png', types: ['Lucha', 'Volador'] },
  { name: 'Mega Gardevoir', dex: 282, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/
sprites/pokemon/mega/282-mega.png', types: ['Psíquico', 'Hada'] },
  { name: 'Zygarde (50%)', dex: 718, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/
sprites/pokemon/718.png', types: ['Dragón', 'Tierra'] }
];

const WHEEL_SECTORS = [
  { id: 'w1', label: '+100 Monedas', type: 'coins', value: 100, color: '#3b82f6', icon: '💰' },
  { id: 'w2', label: 'Revivir Máximo', type: 'card', cardId: 'card-1', color: '#a855f7', icon: '🃏' },
  { id: 'w3', label: '+250 Monedas', type: 'coins', value: 250, color: '#ec4899', icon: '💎' },
  { id: 'w4', label: 'Sin Premio (0)', type: 'empty', value: 0, color: '#475569', icon: '💨' },
  { id: 'w5', label: 'Carta Mega Stone', type: 'card', cardId: 'card-2', color: '#06b6d4', icon: '💎' },
  { id: 'w6', label: '¡JACKPOT! +600', type: 'coins', value: 600, color: '#eab308', icon: '👑' }
];

const INITIAL_TRADES = [
  { 
    id: 't1', 
    offerUserId: 'u3', 
    offerUserName: 'AshKetchum_XY', 
    pokemonName: 'Greninja (Forma Aso)', 
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png',
    level: 36, 
    nickname: 'NinjaK', 
    nature: 'Miedosa', 
    ability: 'Torrente', 
    heldItem: 'Agua Mística', 
    requestingText: 'Xerneas o Piedra Activadora Mega', 
    status: 'open', 
    createdAt: 'Hace 15 mins' 
  },
  { 
    id: 't2', 
    offerUserId: 'u4', 
    offerUserName: 'SerenaPerform', 
    pokemonName: 'Sylveon', 
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/700.png',
    level: 28, 
    nickname: 'Ribbon', 
    nature: 'Modesta', 
    ability: 'Piel Feérica', 
    heldItem: 'Tabla Duende', 
    requestingText: '250 Monedas Kalos o Revivir Máximo', 
    status: 'open', 
    createdAt: 'Hace 1 hora' 
  }
];

export default function App() {
  // --- STATES ---
  const [users, setUsers] = useState(INITIAL_USERS);
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [trades, setTrades] = useState(INITIAL_TRADES);
  const [currentUserId, setCurrentUserId] = useState('u1'); // Default logged in as admin
  const [activeTab, setActiveTab] = useState('shop'); // shop, card-creator, trades, roulette, inventory, 
admin, mod
  
  // Auth Form
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [formEmail, setFormEmail] = useState('');
  const [formName, setFormName] = useState('');

  // Toast System
  const [toast, setToast] = useState(null);

  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const updateUserCoins = (userId, amount) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const newCoins = Math.max(0, u.coins + amount);
        return { ...u, coins: newCoins };
      }
      return u;
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formEmail || !formName) return;

    const existing = users.find(u => u.email.toLowerCase() === formEmail.toLowerCase());
    if (existing) {
      showToast('El correo ya está registrado.', 'error');
      return;
    }

    const newUser = {
      id: 'u_' + Date.now(),
      email: formEmail,
      name: formName,
      role: 'player',
      status: 'pending',
      coins: 200,
      inventory: []
    };

    setUsers([...users, newUser]);
    setCurrentUserId(newUser.id);
    setIsAuthModalOpen(false);
    setFormEmail('');
    setFormName('');
    showToast('Solicitud de ingreso registrada. Un Admin aprobará tu acceso pronto.');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email.toLowerCase() === formEmail.toLowerCase());
    if (user) {
      setCurrentUserId(user.id);
      setIsAuthModalOpen(false);
      setFormEmail('');
      showToast(`Sesión iniciada como: ${user.name}`);
    } else {
      showToast('Correo no encontrado.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans 
selection:bg-purple-600 selection:text-white relative">
      
      {/* GLOW DECORATIONS */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl 
pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl 
pointer-events-none" />

      {/* --- HEADER BANNER --- */}
      <header className="bg-slate-900/90 border-b border-purple-800/40 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 
text-xs sm:text-sm">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 p-0.5 rounded-lg 
shadow-lg shadow-purple-900/50">
              <div className="bg-slate-950 px-2.5 py-1 rounded-[7px] flex items-center space-x-1.5">
                <Flame className="w-4 h-4 text-pink-500 animate-pulse" />
                <span className="font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r 
from-purple-400 to-pink-400">
                  TWITCH LOCKE <span className="text-amber-400">XY</span>
                </span>
              </div>
            </div>
            <span className="text-slate-500 hidden lg:inline">| Pokémon Kalos Portal</span>
          </div>

          {/* Quick User Switcher */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-lg border 
border-slate-800">
            <span className="text-slate-400 text-xs hidden sm:inline">Simular Usuario:</span>
            <select 
              value={currentUserId} 
              onChange={(e) => setCurrentUserId(e.target.value)}
              className="bg-slate-900 text-purple-300 font-bold px-2 py-1 rounded border border-purple-800/
60 focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer text-xs"
            >
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role.toUpperCase()}) - [{u.status === 'approved' ? '✓ Aprobado' : u.status 
=== 'pending' ? '⌛ Pendiente' : '✕ Rechazado'}]
                </option>
              ))}
            </select>
          </div>

          {/* User Balance & Account Modal */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500/20 to-amber-600/
10 border border-amber-500/40 px-3 py-1 rounded-full text-amber-400 font-extrabold shadow-sm">
              <Coins className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>{currentUser.coins}</span>
              <span className="text-[10px] text-amber-500/80">KALOS COINS</span>
            </div>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center space-x-1 bg-purple-600 hover:bg-purple-500 text-white px-3 
py-1 rounded-md font-medium transition text-xs shadow-md shadow-purple-900/30"
            >
              <LogInIcon className="w-3.5 h-3.5" />
              <span>Cuenta</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- DASHBOARD USER PROFILE BAR --- */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border-b 
border-purple-900/30 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 
to-amber-400 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center 
font-black text-purple-300">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-950 ${
                currentUser.status === 'approved' ? 'bg-emerald-500' : currentUser.status === 'pending' ? 
'bg-amber-500' : 'bg-rose-500'
              }`} />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white">{currentUser.name}</h2>
                <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded 
border ${
                  currentUser.role === 'admin' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                  currentUser.role === 'moderator' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                  'bg-blue-500/20 text-blue-300 border-blue-500/40'
                }`}>
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <span>{currentUser.email}</span>
                <span>•</span>
                <span className={
                  currentUser.status === 'approved' ? 'text-emerald-400' :
                  currentUser.status === 'pending' ? 'text-amber-400' : 'text-rose-400'
                }>
                  {currentUser.status === 'approved' ? 'Acceso Permitido' : currentUser.status === 
'pending' ? 'Esperando Aprobación' : 'Acceso Denegado'}
                </span>
              </p>
            </div>
          </div>

          {/* MAIN TABS NAVIGATION */}
          <nav className="flex flex-wrap gap-1 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('shop')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold 
transition ${
                activeTab === 'shop' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' : 
'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Tienda de Cartas</span>
            </button>

            {currentUser.role === 'admin' && (
              <button
                onClick={() => setActiveTab('card-creator')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold 
transition ${
                  activeTab === 'card-creator' ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30' : 
'text-pink-400 hover:text-pink-300'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Creador de Cartas</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('trades')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold 
transition ${
                activeTab === 'trades' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' : 
'text-slate-400 hover:text-white'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Intercambios X&Y</span>
            </button>

            <button
              onClick={() => setActiveTab('roulette')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold 
transition ${
                activeTab === 'roulette' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' : 
'text-slate-400 hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Ruleta Kalos</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold 
transition ${
                activeTab === 'inventory' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' : 
'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Mis Cartas ({currentUser.inventory.length})</span>
            </button>

            {(currentUser.role === 'admin' || currentUser.role === 'moderator') && (
              <button
                onClick={() => setActiveTab('mod')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold 
transition ${
                  activeTab === 'mod' ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30' : 
'text-amber-400 hover:text-amber-300'
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Gestión Monedas</span>
              </button>
            )}

            {currentUser.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold 
transition ${
                  activeTab === 'admin' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 
'text-rose-400 hover:text-rose-300'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Aprobaciones</span>
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* --- MAIN DISPLAY --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">

        {/* STATUS GUARD FOR NON-APPROVED USERS */}
        {currentUser.status !== 'approved' && activeTab !== 'inventory' ? (
          <div className="max-w-md mx-auto my-16 bg-slate-900 border border-amber-500/40 rounded-2xl p-6 
text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-rose-500 
to-amber-500" />
            <ShieldAlert className="w-16 h-16 text-amber-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-white mb-2">Acceso Pendiente de Aprobación</h3>
            <p className="text-xs text-slate-300 mb-6">
              {currentUser.status === 'pending'
                ? 'Tu registro por correo electrónico está en lista de espera. Un Administrador debe 
aprobar tu usuario para que puedas usar la tienda y los intercambios.'
                : 'Tu solicitud de acceso fue rechazada por la administración.'}
            </p>
            <div className="p-3 bg-slate-950 rounded-lg text-xs text-slate-400 border border-slate-800">
              💡 Tip de prueba: Selecciona el usuario <strong>KalosMaster (Admin)</strong> en la barra 
superior para aprobar este perfil o explorar todas las secciones.
            </div>
          </div>
        ) : (
          <>
            {/* 1. TIENDA DE CARTAS */}
            {activeTab === 'shop' && (
              <ShopTab 
                cards={cards} 
                currentUser={currentUser} 
                setCards={setCards}
                setUsers={setUsers}
                showToast={showToast}
              />
            )}

            {/* 2. CREADOR DE CARTAS (ADMIN ONLY) */}
            {activeTab === 'card-creator' && currentUser.role === 'admin' && (
              <CardCreatorTab 
                cards={cards} 
                setCards={setCards} 
                showToast={showToast} 
              />
            )}

            {/* 3. INTERCAMBIOS POKÉMON X & Y */}
            {activeTab === 'trades' && (
              <TradesXYTab 
                trades={trades}
                setTrades={setTrades}
                currentUser={currentUser}
                showToast={showToast}
              />
            )}

            {/* 4. RULETA KALOS */}
            {activeTab === 'roulette' && (
              <RouletteTab 
                currentUser={currentUser} 
                updateUserCoins={updateUserCoins}
                setUsers={setUsers}
                showToast={showToast}
              />
            )}

            {/* 5. MIS CARTAS / INVENTARIO */}
            {activeTab === 'inventory' && (
              <InventoryTab 
                currentUser={currentUser} 
                cards={cards} 
              />
            )}

            {/* 6. MODERACIÓN / MONEDAS */}
            {activeTab === 'mod' && (currentUser.role === 'admin' || currentUser.role === 'moderator') && (
              <ModCoinsTab 
                users={users} 
                updateUserCoins={updateUserCoins}
                showToast={showToast}
              />
            )}

            {/* 7. ADMIN APROBACIONES */}
            {activeTab === 'admin' && currentUser.role === 'admin' && (
              <AdminApprovalTab 
                users={users} 
                setUsers={setUsers}
                showToast={showToast}
              />
            )}
          </>
        )}
      </main>

      {/* --- AUTH MODAL --- */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center 
p-4">
          <div className="bg-slate-900 border border-purple-800/60 rounded-2xl p-6 w-full max-w-md 
shadow-2xl relative">
            <button 
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <XCircle className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {authMode === 'login' ? 'Iniciar Sesión' : 'Registro de Concursante'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {authMode === 'login' 
                  ? 'Accede con tu correo electrónico de registro' 
                  : 'Ingresa tus datos. Tu cuenta requerirá aprobación del Admin.'}
              </p>
            </div>

            <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nombre de Entrenador / 
Twitch</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ej. Kalos_Trainer99"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm 
text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="entrenador@kaloslocke.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm 
text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-lg 
text-sm transition shadow-lg shadow-purple-600/30"
              >
                {authMode === 'login' ? 'Entrar al Dashboard' : 'Solicitar Acceso'}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
              {authMode === 'login' ? (
                <p>
                  ¿No tienes acceso?{' '}
                  <button 
                    onClick={() => setAuthMode('register')} 
                    className="text-purple-400 font-bold hover:underline"
                  >
                    Regístrate con tu correo
                  </button>
                </p>
              ) : (
                <p>
                  ¿Ya tienes cuenta?{' '}
                  <button 
                    onClick={() => setAuthMode('login')} 
                    className="text-purple-400 font-bold hover:underline"
                  >
                    Inicia sesión aquí
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- TOAST NOTIFICATION --- */}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl 
shadow-2xl border text-xs font-bold animate-bounce ${
          toast.type === 'error' 
            ? 'bg-rose-950/90 text-rose-200 border-rose-800' 
            : 'bg-emerald-950/90 text-emerald-200 border-emerald-800'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4 text-rose-400" /> : <CheckCircle 
className="w-4 h-4 text-emerald-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-600">
        Twitch Locke Portal • Sistema de Monedas Virtuales sin dinero real • Tema Pokémon X&Y
      </footer>
    </div>
  );
}

// ==========================================
// COMPONENT: SHOP TAB
// ==========================================
function ShopTab({ cards, currentUser, setCards, setUsers, showToast }) {
  const buyCard = (card) => {
    if (currentUser.coins < card.price) {
      showToast('Monedas Kalos insuficientes.', 'error');
      return;
    }
    if (card.stock <= 0) {
      showToast('Carta agotada.', 'error');
      return;
    }

    // Deduct coins & Add to inventory
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          coins: u.coins - card.price,
          inventory: [...u.inventory, card.id]
        };
      }
      return u;
    }));

    // Reduce card stock
    setCards(prev => prev.map(c => {
      if (c.id === card.id) {
        return { ...c, stock: c.stock - 1 };
      }
      return c;
    }));

    showToast(`¡Compraste "${card.name}" con éxito!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b 
border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="text-purple-400" /> Tienda de Cartas Locke Kalos
          </h2>
          <p className="text-xs text-slate-400">Canjea tus monedas virtuales por cartas estratégicas 
durante el torneo de Pokémon X/Y.</p>
        </div>
        <div className="text-xs bg-purple-950/40 border border-purple-800/40 text-purple-300 px-3 py-1.5 
rounded-lg">
          Monedas Disponibles: <span className="font-bold text-amber-400">{currentUser.coins} LC</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(card => {
          return (
            <div key={card.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl 
overflow-hidden flex flex-col justify-between hover:border-purple-500/50 transition 
duration-300 group shadow-xl">
              <div>
                {/* CARD GRAPHIC HEADER */}
                <div className={`relative h-48 bg-gradient-to-b ${card.bgTheme || 'from-purple-900 
to-slate-950'} p-3 flex flex-col justify-between overflow-hidden`}>
                  <div className="flex justify-between items-start z-10">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-950/80 
text-purple-300 px-2 py-0.5 rounded border border-purple-800/50">
                      {card.type}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 
text-slate-950 px-2 py-0.5 rounded shadow">
                      {card.rarity}
                    </span>
                  </div>

                  <div className="my-auto flex justify-center z-10">
                    <img 
                      src={card.image} 
                      alt={card.name} 
                      className="w-24 h-24 object-contain group-hover:scale-110 transition duration-300 
drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
                    />
                  </div>

                  <div className="z-10 bg-slate-950/70 p-1.5 rounded-lg text-[10px] text-amber-300 
font-bold text-center border border-amber-500/30">
                    ⚡ {card.effect}
                  </div>
                </div>

                {/* CARD BODY */}
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-white text-base leading-tight">{card.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{card.description}</p>
                </div>
              </div>

              {/* CARD FOOTER */}
              <div className="p-4 pt-0 space-y-3">
                <div className="flex items-center justify-between text-xs border-t border-slate-800/80 
pt-3">
                  <span className="text-slate-400 text-[11px]">Stock: <strong className={card.stock > 0 ? 
'text-emerald-400' : 'text-rose-400'}>{card.stock} unids</strong></span>
                  <span className="text-amber-400 font-extrabold text-sm flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5" />
                    {card.price} LC
                  </span>
                </div>

                <button
                  onClick={() => buyCard(card)}
                  disabled={card.stock <= 0 || currentUser.coins < card.price}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center 
justify-center space-x-1 ${
                    card.stock <= 0 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                      : currentUser.coins < card.price
                      ? 'bg-amber-950/40 border border-amber-800/40 text-amber-500/60 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 
hover:to-pink-500 text-white shadow-lg shadow-purple-900/40'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{card.stock <= 0 ? 'Agotado' : currentUser.coins < card.price ? 'Monedas 
Insuficientes' : 'Comprar Carta'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// COMPONENT: CARD CREATOR TAB (ADMIN)
// ==========================================
function CardCreatorTab({ cards, setCards, showToast }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('Objeto');
  const [rarity, setRarity] = useState('Rara');
  const [price, setPrice] = useState(200);
  const [stock, setStock] = useState(5);
  const [effect, setEffect] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/
items/rare-candy.png');
  const [bgTheme, setBgTheme] = useState('from-purple-900 via-indigo-950 to-slate-950');

  const presetImages = [
    { label: 'Caramelo Raro', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/
rare-candy.png' },
    { label: 'Piedra Mega', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/
mega-ring.png' },
    { label: 'Master Ball', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/
master-ball.png' },
    { label: 'Revivir Máximo', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/
items/max-revive.png' },
    { label: 'Mochila Kalos', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/
exp-share.png' }
  ];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name || !effect) {
      showToast('Por favor completa el nombre y el efecto de la carta.', 'error');
      return;
    }

    const newCard = {
      id: 'card-' + Date.now(),
      name,
      type,
      rarity,
      price: Number(price),
      stock: Number(stock),
      effect,
      description: description || 'Efecto especial de Twitch Locke para Pokémon X/Y.',
      image,
      bgTheme
    };

    setCards([newCard, ...cards]);
    showToast(`¡Carta "${name}" creada y publicada en la Tienda!`);

    // Reset Form
    setName('');
    setEffect('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Wand2 className="text-pink-400" /> Creador Avanzado de Cartas Personalizadas
        </h2>
        <p className="text-xs text-slate-400">Diseña nuevas reglas, ventajas e ítems para la tienda del 
Twitch Locke.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FORM */}
        <form onSubmit={handleCreate} className="lg:col-span-2 bg-slate-900/90 border border-purple-900/50 
p-6 rounded-2xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nombre de la Carta</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Inmunidad Gimnasio Tipo Hada"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs 
text-white focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Tipo de Carta</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs 
text-purple-300 focus:outline-none focus:border-pink-500"
              >
                <option value="Pokémon">Pokémon</option>
                <option value="Objeto">Objeto</option>
                <option value="Estado">Estado</option>
                <option value="Clave">Clave</option>
                <option value="Batalla">Batalla</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Raridad</label>
              <select
                value={rarity}
                onChange={(e) => setRarity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs 
text-amber-300 focus:outline-none focus:border-pink-500"
              >
                <option value="Común">Común</option>
                <option value="Rara">Rara</option>
                <option value="Épica">Épica</option>
                <option value="Legendaria">Legendaria</option>
                <option value="Mega">Mega Evolución</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Precio (Monedas Kalos)</
label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs 
text-white focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Stock Disponible</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs 
text-white focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Efecto Especial Rápido</
label>
              <input
                type="text"
                required
                value={effect}
                onChange={(e) => setEffect(e.target.value)}
                placeholder="Ej. Revive a 1 Pokémon o Inmunidad"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs 
text-white focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Imagen URL del Sprite / Ítem</
label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs 
text-white focus:outline-none focus:border-pink-500"
            />
            
            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[10px] text-slate-500 flex items-center">Presets:</span>
              {presetImages.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImage(p.url)}
                  className="text-[10px] bg-slate-950 hover:bg-purple-950 text-slate-300 px-2 py-0.5 
rounded border border-slate-800"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Descripción Completa</label>
            <textarea
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explica las reglas de uso de esta carta..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs 
text-white focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Estilo de Fondo de la Carta</
label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: 'Gengar Neón', value: 'from-purple-900 via-indigo-950 to-slate-950' },
                { name: 'Mega Lucario Aura', value: 'from-cyan-600 via-blue-950 to-slate-950' },
                { name: 'Xerneas Hada', value: 'from-pink-600 via-purple-950 to-slate-950' },
              ].map((theme, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setBgTheme(theme.value)}
                  className={`p-2 rounded-lg text-[10px] font-bold border ${
                    bgTheme === theme.value ? 'border-pink-500 bg-pink-950/40 text-white' : 
'border-slate-800 text-slate-400'
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 
hover:to-purple-500 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-lg 
shadow-pink-900/40"
          >
            Publicar Carta en la Tienda
          </button>
        </form>

        {/* LIVE PREVIEW CARD */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 block text-center">Vista Previa en Tiempo 
Real</span>
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl 
max-w-xs mx-auto">
            <div className={`relative h-56 bg-gradient-to-b ${bgTheme} p-3 flex flex-col justify-between 
overflow-hidden`}>
              <div className="flex justify-between items-start z-10">
                <span className="text-[10px] font-black uppercase tracking-wider bg-slate-950/80 
text-purple-300 px-2 py-0.5 rounded border border-purple-800/50">
                  {type}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 
text-slate-950 px-2 py-0.5 rounded shadow">
                  {rarity}
                </span>
              </div>

              <div className="my-auto flex justify-center z-10">
                <img 
                  src={image || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/
rare-candy.png'} 
                  alt="Preview" 
                  className="w-28 h-28 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
                />
              </div>

              <div className="z-10 bg-slate-950/70 p-1.5 rounded-lg text-[10px] text-amber-300 font-bold 
text-center border border-amber-500/30">
                ⚡ {effect || 'Efecto de prueba'}
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-bold text-white text-base leading-tight">{name || 'Nombre de la Carta'}</
h3>
              <p className="text-xs text-slate-400">{description || 'Descripción explicativa de la carta...
'}</p>
              
              <div className="flex items-center justify-between text-xs border-t border-slate-800/80 pt-3">
                <span className="text-slate-400 text-[11px]">Stock: <strong className="text-emerald-400">
{stock} unids</strong></span>
                <span className="text-amber-400 font-extrabold text-sm flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" />
                  {price} LC
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// COMPONENT: POKÉMON X & Y TRADES HUB
// ==========================================
function TradesXYTab({ trades, setTrades, currentUser, showToast }) {
  const [selectedPokemon, setSelectedPokemon] = useState(KALOS_POKEMON_LIST[0]);
  const [level, setLevel] = useState(30);
  const [nickname, setNickname] = useState('');
  const [nature, setNature] = useState('Firme');
  const [ability, setAbility] = useState('Torrente');
  const [heldItem, setHeldItem] = useState('Mega Piedra');
  const [requestingText, setRequestingText] = useState('');

  const handleCreateTrade = (e) => {
    e.preventDefault();
    if (!requestingText) return;

    const newTrade = {
      id: 't_' + Date.now(),
      offerUserId: currentUser.id,
      offerUserName: currentUser.name,
      pokemonName: selectedPokemon.name,
      pokemonSprite: selectedPokemon.sprite,
      level: Number(level),
      nickname: nickname || selectedPokemon.name,
      nature,
      ability,
      heldItem,
      requestingText,
      status: 'open',
      createdAt: 'Ahora mismo'
    };

    setTrades([newTrade, ...trades]);
    setNickname('');
    setRequestingText('');
    showToast(`Oferta de ${selectedPokemon.name} publicada en el Mercado XY.`);
  };

  const handleCloseTrade = (tradeId) => {
    setTrades(prev => prev.map(t => t.id === tradeId ? { ...t, status: 'completed' } : t));
    showToast('Intercambio completado.');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* POKEMON XY OFFER FORM */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 h-fit shadow-xl">
        <h3 className="font-bold text-white text-base flex items-center gap-2 border-b border-slate-800 
pb-3">
          <ArrowRightLeft className="text-purple-400" /> Mercado de Intercambio Pokémon X/Y
        </h3>

        <form onSubmit={handleCreateTrade} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Selecciona Pokémon de Kalos</
label>
            <select
              value={selectedPokemon.name}
              onChange={(e) => {
                const found = KALOS_POKEMON_LIST.find(p => p.name === e.target.value);
                if (found) setSelectedPokemon(found);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs 
text-purple-300 focus:outline-none focus:border-purple-500"
            >
              {KALOS_POKEMON_LIST.map((pk, idx) => (
                <option key={idx} value={pk.name}>{pk.name} (Nº {pk.dex})</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 p-2 rounded-xl border border-slate-800">
            <img src={selectedPokemon.sprite} alt={selectedPokemon.name} className="w-14 h-14 
object-contain" />
            <div className="text-xs">
              <span className="font-bold text-white block">{selectedPokemon.name}</span>
              <span className="text-[10px] text-slate-400">Tipos: {selectedPokemon.types.join(' / ')}</
span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">Nivel</label>
              <input
                type="number"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs 
text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">Mote / Nickname</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Opcional"
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs 
text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">Naturaleza</label>
              <input
                type="text"
                value={nature}
                onChange={(e) => setNature(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs 
text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">Objeto Equipado</label>
              <input
                type="text"
                value={heldItem}
                onChange={(e) => setHeldItem(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs 
text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Solicito a cambio</label>
            <input
              type="text"
              required
              value={requestingText}
              onChange={(e) => setRequestingText(e.target.value)}
              placeholder="Ej. Xerneas, 200 Monedas o Carta Mega Stone"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs 
text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl 
text-xs transition shadow-md shadow-purple-900/40"
          >
            Publicar Oferta de Intercambio
          </button>
        </form>
      </div>

      {/* TRADES LISTINGS */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="font-bold text-white text-base">Ofertas Activas de la Comunidad Kalos</h3>

        {trades.length === 0 ? (
          <p className="text-xs text-slate-500">No hay intercambios publicados aún.</p>
        ) : (
          <div className="space-y-3">
            {trades.map(trade => (
              <div 
                key={trade.id} 
                className={`p-4 bg-slate-900/90 border rounded-2xl flex flex-col sm:flex-row 
sm:items-center justify-between gap-4 transition shadow-lg ${
                  trade.status === 'completed' ? 'border-slate-800 opacity-60' : 'border-purple-900/40 
hover:border-purple-600/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-slate-950 rounded-xl p-1 border border-slate-800 flex 
items-center justify-center shrink-0">
                    <img src={trade.pokemonSprite} alt={trade.pokemonName} className="w-full h-full 
object-contain" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-purple-300">{trade.offerUserName}</span>
                      <span className="text-[10px] text-slate-500">• {trade.createdAt}</span>
                    </div>

                    <h4 className="font-bold text-white text-sm">
                      {trade.pokemonName} <span className="text-xs text-purple-400 font-normal">(Niv. 
{trade.level})</span>
                    </h4>

                    <div className="flex flex-wrap gap-2 text-[10px] text-slate-400">
                      <span>Mote: <strong className="text-slate-200">{trade.nickname}</strong></span>
                      <span>• Nat: <strong className="text-slate-200">{trade.nature}</strong></span>
                      <span>• Objeto: <strong className="text-amber-300">{trade.heldItem}</strong></span>
                    </div>

                    <div className="text-xs bg-slate-950 px-2 py-1 rounded border border-slate-800 mt-1">
                      <span className="text-slate-500 text-[10px]">Busca: </span>
                      <span className="text-amber-400 font-bold">{trade.requestingText}</span>
                    </div>
                  </div>
                </div>

                {trade.status === 'open' && (
                  <div className="flex items-center space-x-2 shrink-0">
                    {trade.offerUserId === currentUser.id ? (
                      <button
                        onClick={() => handleCloseTrade(trade.id)}
                        className="bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 px-3 py-1.5 
rounded-lg"
                      >
                        Completar
                      </button>
                    ) : (
                      <button
                        onClick={() => showToast(`Propuesta enviada a ${trade.offerUserName} en el juego.
`)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 
hover:to-pink-500 text-xs font-bold text-white px-3 py-2 rounded-xl shadow"
                      >
                        Aceptar Trato
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

// ==========================================
// COMPONENT: KALOS ROULETTE
// ==========================================
function RouletteTab({ currentUser, updateUserCoins, setUsers, showToast }) {
  const COST = 150;
  const [spinning, setSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);

  const spinWheel = () => {
    if (currentUser.coins < COST) {
      showToast('Monedas Kalos insuficientes para girar.', 'error');
      return;
    }

    if (spinning) return;

    updateUserCoins(currentUser.id, -COST);
    setSpinning(true);
    setWonPrize(null);

    const segmentDegree = 360 / WHEEL_SECTORS.length;
    const randomIndex = Math.floor(Math.random() * WHEEL_SECTORS.length);
    const selectedItem = WHEEL_SECTORS[randomIndex];

    const extraRotations = 360 * 5;
    const targetDegree = wheelRotation + extraRotations + (360 - (randomIndex * segmentDegree));

    setWheelRotation(targetDegree);

    setTimeout(() => {
      setSpinning(false);
      setWonPrize(selectedItem);

      if (selectedItem.type === 'coins' && selectedItem.value > 0) {
        updateUserCoins(currentUser.id, selectedItem.value);
        showToast(`¡Ganaste +${selectedItem.value} Monedas Kalos!`);
      } else if (selectedItem.type === 'card' && selectedItem.cardId) {
        setUsers(prev => prev.map(u => {
          if (u.id === currentUser.id) {
            return { ...u, inventory: [...u.inventory, selectedItem.cardId] };
          }
          return u;
        }));
        showToast(`¡GANASTE LA CARTA: ${selectedItem.label}!`, 'success');
      } else {
        showToast('Sin suerte en este intento.', 'error');
      }
    }, 4000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-center">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2">
          <RotateCw className="text-pink-500 animate-spin-slow" /> Ruleta Kalos X&Y
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Gasta <strong className="text-amber-400">{COST} Monedas Kalos</strong> y obtén premios 
exclusivos para tu Locke.
        </p>
      </div>

      <div className="relative py-6 flex flex-col items-center justify-center">
        {/* WHEEL MARKER */}
        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent 
border-t-[25px] border-t-amber-400 z-20 -mb-4 drop-shadow-lg" />

        {/* WHEEL CANVAS / SVG */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-4 border-purple-600/80 
shadow-2xl shadow-purple-900/50 overflow-hidden bg-slate-900">
          <div 
            className="w-full h-full transition-transform ease-out"
            style={{ 
              transform: `rotate(${wheelRotation}deg)`,
              transitionDuration: spinning ? '4000ms' : '0ms'
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {WHEEL_SECTORS.map((item, index) => {
                const total = WHEEL_SECTORS.length;
                const angle = 360 / total;
                const startAngle = index * angle;
                const endAngle = (index + 1) * angle;

                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                const d = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                return (
                  <g key={item.id}>
                    <path d={d} fill={item.color} opacity="0.85" stroke="#0f172a" strokeWidth="1" />
                    <text
                      x="50"
                      y="18"
                      fill="#ffffff"
                      fontSize="4.5"
                      fontWeight="bold"
                      textAnchor="middle"
                      transform={`rotate(${startAngle + angle / 2}, 50, 50)`}
                    >
                      {item.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-slate-950 border-2 
border-purple-500 flex items-center justify-center z-10 shadow-inner">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
        </div>

        <button
          onClick={spinWheel}
          disabled={spinning || currentUser.coins < COST}
          className={`mt-6 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition 
shadow-lg flex items-center space-x-2 ${
            spinning || currentUser.coins < COST
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:scale-105 text-white 
shadow-purple-600/40'
          }`}
        >
          <RotateCw className={`w-4 h-4 ${spinning ? 'animate-spin' : ''}`} />
          <span>{spinning ? 'GIRANDO...' : `GIRAR RULETA (${COST} LC)`}</span>
        </button>
      </div>

      {wonPrize && (
        <div className="p-4 bg-purple-950/40 border border-purple-800/60 rounded-xl">
          <span className="text-xs text-purple-300 block">Premio Obtenido:</span>
          <p className="text-lg font-black text-amber-400 mt-0.5">{wonPrize.label}</p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// COMPONENT: INVENTORY
// ==========================================
function InventoryTab({ currentUser, cards }) {
  const userCards = currentUser.inventory.map(id => cards.find(c => c.id === id)).filter(Boolean);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="text-purple-400" /> Cartas en tu Posesión
        </h2>
        <p className="text-xs text-slate-400">Cartas compradas o ganadas en la ruleta listas para canjear 
en tu transmisión.</p>
      </div>

      {userCards.length === 0 ? (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl">
          <Layers className="w-12 h-12 text-slate-600 mx-auto mb-2" />
          <p className="text-sm text-slate-400">Aún no tienes cartas en tu colección.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userCards.map((card, idx) => (
            <div key={idx} className="bg-slate-900 border border-purple-900/50 rounded-xl p-4 space-y-2">
              <div className="h-32 rounded-lg overflow-hidden bg-slate-950 mb-2 flex items-center 
justify-center p-2">
                <img src={card.image} alt={card.name} className="h-full object-contain" />
              </div>
              <h4 className="font-bold text-white text-sm">{card.name}</h4>
              <p className="text-xs text-slate-400">{card.description}</p>
              <div className="pt-2">
                <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800/40 
px-2 py-0.5 rounded font-mono">
                  CANJEABLE EN DIRECTO
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// COMPONENT: MOD COINS MANAGEMENT
// ==========================================
function ModCoinsTab({ users, updateUserCoins, showToast }) {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [amount, setAmount] = useState(100);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!selectedUserId || !amount) return;

    updateUserCoins(selectedUserId, Number(amount));
    const target = users.find(u => u.id === selectedUserId);
    showToast(`Asignadas ${amount} Monedas Kalos a ${target?.name}`);
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-amber-500/30 rounded-2xl p-6 space-y-4 
shadow-2xl">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <Coins className="text-amber-400" /> Control de Monedas Kalos (Mod/Admin)
      </h3>
      <p className="text-xs text-slate-400">
        Otorga o descuenta puntos a los concursantes por victorias en Gimnasios de Pokémon X/Y o 
interacción en stream.
      </p>

      <form onSubmit={handleAdd} className="space-y-4 pt-2">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Seleccionar Concursante 
Aprobado</label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white 
focus:outline-none focus:border-amber-500"
          >
            <option value="">-- Elige un usuario --</option>
            {users.filter(u => u.status === 'approved').map(u => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.coins} Monedas LC)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Cantidad a Ocultar o Sumar (+/-)
</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white 
focus:outline-none focus:border-amber-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-2.5 rounded-xl 
text-xs transition"
        >
          Aplicar Cambio de Monedas
        </button>
      </form>
    </div>
  );
}

// ==========================================
// COMPONENT: ADMIN APPROVAL TAB
// ==========================================
function AdminApprovalTab({ users, setUsers, showToast }) {
  const updateUserStatus = (userId, status) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    showToast(`Estado de acceso cambiado a: ${status}`);
  };

  const updateUserRole = (userId, role) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
    showToast(`Rol asignado: ${role}`);
  };

  return (
    <div className="bg-slate-900 border border-rose-900/40 rounded-2xl p-6 space-y-4 shadow-2xl">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <UserCheck className="text-rose-400" /> Control de Permisos por Correo Electrónico
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase font-mono">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Correo</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Rol</th>
              <th className="p-3">Acciones de Ingreso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-950/50">
                <td className="p-3 font-bold text-white">{u.name}</td>
                <td className="p-3 text-slate-400">{u.email}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                    u.status === 'approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    u.status === 'pending' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td className="p-3">
                  <select
                    value={u.role}
                    onChange={(e) => updateUserRole(u.id, e.target.value)}
                    className="bg-slate-950 text-xs text-purple-300 border border-slate-800 rounded px-2 
py-1"
                  >
                    <option value="player">Jugador</option>
                    <option value="moderator">Moderador</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-3 space-x-2">
                  {u.status !== 'approved' && (
                    <button
                      onClick={() => updateUserStatus(u.id, 'approved')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg 
text-[11px] font-bold"
                    >
                      Permitir Acceso
                    </button>
                  )}
                  {u.status !== 'rejected' && (
                    <button
                      onClick={() => updateUserStatus(u.id, 'rejected')}
                      className="bg-rose-600 hover:bg-rose-500 text-white px-2.5 py-1 rounded-lg text-
[11px] font-bold"
                    >
                      Rechazar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
