/*
 * Design: Landing page de vendas - Azul #2F6BFF, fundo branco/cinza alternado
 * Layout: Centralizado, max-w-6xl, mobile-first
 * Animações: fade-in-up, glow, float, slide-in
 */

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CheckCircle,
  XCircle,
  Frown,
  AlertCircle,
  UserX,
  Infinity,
  Printer,
  Users,
  DollarSign,
  Palette,
  Map,
  BookOpen,
  Gamepad2,
  Calculator,
  Brain,
  Gift,
  ShieldCheck,
  Mail,
  ChevronDown,
  VolumeX,
} from "lucide-react";

/* ───── Social Proof Popup ───── */
const BUYERS = [
  { name: "Fernanda Lima", plan: "Pacote Completo" },
  { name: "Carlos Souza", plan: "Oferta Completa" },
  { name: "Maria Santos", plan: "Pacote Completo" },
  { name: "João Pedro", plan: "Oferta Completa" },
  { name: "Ana Costa", plan: "Pacote Completo" },
];

function SocialProof() {
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const show = () => {
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % BUYERS.length);
      show();
    }, 53000);
    const firstTimeout = setTimeout(show, 7000);
    return () => {
      clearInterval(interval);
      clearTimeout(firstTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-24 right-4 z-50 bg-white rounded-lg shadow-2xl p-4 max-w-xs animate-slide-in">
      <div className="flex items-start gap-3">
        <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
        <div>
          <p className="text-xs text-gray-500 mb-1">há 3 minutos</p>
          <p className="font-semibold text-sm text-gray-900">{BUYERS[idx].name}</p>
          <p className="text-xs text-gray-600">comprou</p>
          <p className="text-xs font-medium text-blue-600">{BUYERS[idx].plan}</p>
        </div>
      </div>
    </div>
  );
}

/* ───── FAQ Accordion ───── */
const FAQ_DATA = [
  {
    question: "O material já vem pronto para imprimir?",
    answer:
      "Com certeza! Todo o conteúdo é entregue em formato PDF de alta qualidade. Você recebe os arquivos organizados, bastando apenas baixar e imprimir quantas vezes precisar.",
  },
  {
    question: "O material é digital ou físico?",
    answer:
      "O material é 100% digital. Você receberá acesso imediato após a compra e poderá baixar todos os arquivos em PDF.",
  },
  {
    question: "Posso imprimir quantas vezes quiser?",
    answer:
      "Sim! Você tem licença vitalícia e pode imprimir quantas vezes precisar, seja para uso pessoal, em sala de aula ou reforço escolar.",
  },
  {
    question: "Serve para professores e reforço?",
    answer:
      "Sim! O material foi desenvolvido tanto para professores em sala de aula quanto para pais que fazem reforço escolar em casa.",
  },
  {
    question: "Para qual idade é indicado?",
    answer:
      "As dinâmicas são indicadas para crianças de 6 a 12 anos, abrangendo do 1º ao 7º ano do ensino fundamental.",
  },
  {
    question: "Recebo imediatamente?",
    answer:
      "Sim! Assim que o pagamento for confirmado, você recebe o acesso instantâneo por e-mail para baixar todo o material.",
  },
];

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {FAQ_DATA.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-900">{item.question}</span>
            <ChevronDown
              className={`text-[#2F6BFF] transition-transform shrink-0 ml-4 ${open === i ? "rotate-180" : ""}`}
              size={20}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-4">
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ───── Upsell Modal ───── */
function UpsellModal({
  isOpen,
  onClose,
  onCheckout,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (url: string) => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in-up">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#2F6BFF] to-blue-600 p-5 rounded-t-2xl text-white">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 hover:bg-white/20 p-1.5 rounded-full transition"
          >
            <XCircle size={20} />
          </button>
          <div className="text-center">
            <p className="text-sm font-medium text-blue-100 mb-1">
              Espere! Oferta especial para você
            </p>
            <h3 className="text-xl font-bold">Pacote Completo</h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="text-center mb-5">
            <div className="flex items-baseline justify-center gap-3 mb-1">
              <span className="text-gray-500 line-through text-lg">R$ 69,00</span>
              <span className="text-4xl font-bold text-[#2F6BFF]">R$ 17,00</span>
            </div>
            <p className="text-gray-700 font-semibold text-sm">
              Pacote Completo com Desconto Exclusivo!
            </p>
          </div>

          <div className="space-y-2.5 mb-6 max-h-64 overflow-y-auto pr-2">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
              <Gift className="text-[#2F6BFF]" size={16} />
              Tudo que você vai receber:
            </p>
            {[
              { text: "90 Dinâmicas de Matemática", Icon: CheckCircle },
              { text: "Caderno Matemático para Colorir", Icon: Palette },
              { text: "Mapas Mentais Visuais", Icon: Map },
              { text: "Guia Matemática Sem Bloqueios", Icon: BookOpen },
              { text: "150 Jogos Matemáticos para Imprimir", Icon: Gamepad2 },
              { text: "Atividades de Tabuada Divertida", Icon: Calculator },
              { text: "50 Desafios de Raciocínio Lógico", Icon: Brain },
              { text: "Acesso Vitalício", Icon: Infinity },
              { text: "Suporte Dedicado", Icon: Mail },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <item.Icon className="text-green-500 shrink-0" size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <button
              onClick={() =>
                onCheckout(
                  "https://pay.lowify.com.br/checkout?product_id=ALldAo"
                )
              }
              className="w-full bg-gradient-to-r from-[#2F6BFF] to-blue-600 text-white py-3.5 rounded-full font-bold text-base hover:shadow-xl transition-all transform hover:scale-105 shadow-lg animate-glow flex items-center justify-center gap-2"
            >
              <Gift size={20} />
              Aproveitar Oferta de R$ 17,00
            </button>
            <div className="text-center">
              <button
                onClick={() =>
                  onCheckout(
                    "https://pay.lowify.com.br/checkout?product_id=8PM3n3"
                  )
                }
                className="text-sm text-gray-600 hover:text-[#2F6BFF] underline transition-all"
              >
                Não, quero continuar com a de R$10
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Main Page ───── */
export default function Home() {
  const [showUpsell, setShowUpsell] = useState(false);
  const [todayDate, setTodayDate] = useState("");
  const [showMuteOverlay, setShowMuteOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleUnmute = useCallback(() => {
    setShowMuteOverlay(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, []);

  const goToCheckout = useCallback((url: string) => {
    const params = window.location.search;
    window.location.href = `${url}${params}`;
  }, []);

  useEffect(() => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    setTodayDate(`${dd}/${mm}/${yyyy}`);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animationDelay = `${Math.random() * 0.3}s`;
            entry.target.classList.add("scroll-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToPlans = () => {
    document.getElementById("plans")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white">
      <SocialProof />

      {/* ── Top Bar ── */}
      <div className="bg-[#2F6BFF] text-white py-3 text-center font-semibold">
        ⚡ OFERTA VÁLIDA SOMENTE HOJE: {todayDate}
      </div>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-20 pb-8 md:pb-10 text-center">
        <h1
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up"
          style={{ textShadow: "0 4px 20px rgba(47, 107, 255, 0.3)" }}
        >
          90 Dinâmicas de Matemática 📚✨
        </h1>
        <p
          className="text-xl md:text-2xl text-[#2F6BFF] mb-6 max-w-3xl mx-auto animate-fade-in-up font-semibold"
          style={{ animationDelay: "0.1s" }}
        >
          Ensine matemática de forma leve, prática e envolvente — sem perder horas planejando.
        </p>

        <div
          className="mb-10 relative animate-fade-in-up flex justify-center"
          style={{ animationDelay: "0.2s" }}
        >
          <div
            className="w-full max-w-sm rounded-2xl shadow-xl transform transition-transform duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden relative"
            style={{ aspectRatio: "9 / 16" }}
          >
            <video
              ref={videoRef}
              src="https://imgur.com/rwOQ3u0.mp4"
              controls
              autoPlay
              muted
              loop={false}
              className="w-full h-full object-contain bg-black"
              width="360"
              height="640"
            />
            {showMuteOverlay && (
              <div
                onClick={handleUnmute}
                className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
              >
                <div className="bg-[#2F6BFF] rounded-2xl px-8 py-6 flex flex-col items-center gap-2 shadow-2xl">
                  <p className="text-white font-bold text-base">Seu vídeo já começou</p>
                  <VolumeX className="text-white" size={32} />
                  <p className="text-white font-bold text-base">Clique para ouvir</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={scrollToPlans}
          className="bg-[#2F6BFF] text-white px-8 py-5 rounded-full text-lg font-bold shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 animate-fade-in-up animate-glow"
          style={{ animationDelay: "0.3s" }}
        >
          👉 Quero acessar as
          <br />
          dinâmicas agora
        </button>

        {/* Pílula Blue Glass */}
        <div
          className="mt-20 mb-6 inline-flex items-center gap-3 px-6 py-3 rounded-full animate-fade-in-up"
          style={{
            animationDelay: "0.4s",
            background: "rgba(47, 107, 255, 0.15)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(47, 107, 255, 0.3)",
            boxShadow: "0 4px 20px rgba(47, 107, 255, 0.15)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2F6BFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          <span className="text-[#1a3a8a] font-semibold text-sm md:text-base">
            Material Completo, Pronto para Impressão
          </span>
        </div>
      </section>

      {/* ── Problem Section ── */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-10 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 animate-fade-in-up">
            Você sente que poderia deixar suas aulas mais interessantes?
          </h2>
          <div className="max-w-2xl mx-auto space-y-3 mb-12">
            {[
              { text: "Alunos perdem o foco", Icon: AlertCircle },
              { text: "Acham matemática difícil", Icon: Frown },
              { text: "Desanimam rápido", Icon: XCircle },
              { text: "Não participam", Icon: UserX },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 text-lg text-gray-700 animate-fade-in-up p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                style={{ animationDelay: `${0.1 * (i + 1)}s` }}
              >
                <item.Icon
                  className="text-red-500 shrink-0 animate-float"
                  size={24}
                  style={{ animationDelay: `${0.1 * i}s` }}
                />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
          <div
            className="text-center max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed">
              O problema não é o conteúdo.
              <br />
              <span className="text-[#2F6BFF]">É a forma como ele é apresentado.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Content Premium ── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-4 animate-fade-in-up">
            <span className="inline-block bg-[#2F6BFF] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
              CONTEÚDO PREMIUM
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            O que você vai encontrar?
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className="rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] hover:-translate-y-4 animate-fade-in-up overflow-hidden"
              style={{ animationDelay: "0.2s" }}
            >
              <img
                src="https://i.imgur.com/S40UhwA.png"
                alt="Dinâmicas de Matemática"
                className="w-full h-auto"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              {[
                "Adição",
                "Subtração",
                "Multiplicação",
                "Divisão",
                "Frações",
                "Raciocínio lógico",
                "Desafios matemáticos",
              ].map((topic, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                  style={{ animationDelay: `${0.05 * i}s` }}
                >
                  <CheckCircle
                    className="text-green-500 shrink-0 animate-float"
                    size={24}
                    style={{ animationDelay: `${0.1 * i}s` }}
                  />
                  <span className="text-lg font-medium text-gray-800">{topic}</span>
                </div>
              ))}
              <p className="text-gray-600 pt-4 border-t border-gray-200 font-medium">
                Material estruturado, pronto para imprimir e aplicar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Buy ── */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 animate-fade-in-up">
            Por que comprar?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Infinity, title: "Acesso Vitalício", desc: "Use para sempre." },
              { Icon: Printer, title: "Pronto para Imprimir", desc: "Receba tudo organizado para impressão." },
              { Icon: Users, title: "Mais Participação", desc: "Aulas mais dinâmicas." },
              { Icon: DollarSign, title: "Custo-Benefício", desc: "Menos que um lanche." },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (i + 1)}s` }}
              >
                <item.Icon
                  className="mx-auto mb-4 text-[#2F6BFF] animate-float"
                  size={48}
                  style={{ animationDelay: `${0.1 * i}s` }}
                />
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bonus Section ── */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3 animate-fade-in-up">
            🎁 Bônus Exclusivos
          </h2>
          <p
            className="text-center text-gray-500 mb-12 text-sm animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            (Disponíveis apenas no pacote completo)
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                Icon: Palette,
                title: "Caderno Matemático para Colorir",
                desc: "Aprendizado lúdico.",
              },
              {
                Icon: Map,
                title: "Mapas Mentais Visuais",
                desc: "Explicações claras e simples.",
              },
              {
                Icon: BookOpen,
                title: "Mini Guia: Matemática Sem Bloqueios",
                desc: "Estratégias práticas para melhorar o interesse.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-3 duration-300 border border-gray-100 animate-fade-in-up scroll-animate"
                style={{ animationDelay: `${0.1 * (i + 1)}s` }}
              >
                <item.Icon
                  className="mb-4 text-[#2F6BFF] animate-float"
                  size={40}
                  style={{ animationDelay: `${0.1 * i}s` }}
                />
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section id="plans" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Escolha o seu pacote
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow animate-fade-in-up border-2 border-[#2F6BFF]">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pacote Básico</h3>
              <div className="mb-6">
                <p className="text-5xl font-bold text-gray-900">R$ 10,00</p>
              </div>
              <div className="mb-8 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">90 Dinâmicas de Matemática</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">Acesso Vitalício</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">Suporte via Email</span>
                </div>
              </div>
              <button
                onClick={() => setShowUpsell(true)}
                className="w-full bg-[#2F6BFF] text-white py-4 rounded-full font-bold hover:bg-blue-700 transition-all transform hover:scale-105 duration-200"
              >
                Quero as dinâmicas agora
              </button>
            </div>

            {/* Complete Plan */}
            <div
              className="bg-white p-8 rounded-2xl shadow-2xl border-4 border-[#2F6BFF] relative animate-fade-in-up hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] transition-shadow animate-glow-slow"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#2F6BFF] text-white px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-lg animate-glow-slow">
                ⭐ 92% das pessoas escolhem essa opção
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-4">Pacote Completo</h3>
              <div className="mb-6">
                <p className="text-5xl font-bold text-[#2F6BFF]">R$ 27,00</p>
              </div>
              <div className="mb-8 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 shrink-0" size={20} />
                  <span className="text-gray-700">90 Dinâmicas de Matemática</span>
                </div>
                <div className="flex items-center gap-2">
                  <Infinity className="text-green-500 shrink-0" size={20} />
                  <span className="text-gray-700">Acesso Vitalício</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="text-green-500 shrink-0" size={20} />
                  <span className="text-gray-700">Suporte Dedicado via Email</span>
                </div>

                <div className="my-4 border-t-2 border-dashed border-gray-300" />

                <p className="text-sm font-bold text-[#2F6BFF] uppercase tracking-wide flex items-center gap-2">
                  <Gift className="text-[#2F6BFF]" size={20} />
                  Bônus Exclusivos:
                </p>

                {[
                  { text: "Caderno Matemático para Colorir", Icon: Palette },
                  { text: "Mapas Mentais Visuais", Icon: Map },
                  { text: "Guia Matemática Sem Bloqueios", Icon: BookOpen },
                  { text: "150 Jogos Matemáticos para Imprimir", Icon: Gamepad2 },
                  { text: "Atividades de Tabuada Divertida", Icon: Calculator },
                  { text: "50 Desafios de Raciocínio Lógico", Icon: Brain },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.Icon className="text-[#2F6BFF] shrink-0" size={18} />
                    <span className="text-gray-700 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() =>
                  goToCheckout(
                    "https://pay.lowify.com.br/checkout?product_id=nYpuwo"
                  )
                }
                className="w-full bg-[#2F6BFF] text-white py-5 rounded-full font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg animate-glow"
              >
                Quero as dinâmicas agora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Upsell Modal ── */}
      <UpsellModal
        isOpen={showUpsell}
        onClose={() => setShowUpsell(false)}
        onCheckout={(url) => {
          const params = window.location.search;
          window.location.href = `${url}${params}`;
        }}
      />

      {/* ── Testimonials ── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            ⭐ O que estão dizendo...
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ana Paula S.",
                role: "Mãe",
                text: "Meu filho não gostava de matemática. Agora pede para fazer as atividades todos os dias. A mudança foi incrível, ele até melhorou as notas na escola!",
                image: "https://i.imgur.com/7IVrhUU.png",
              },
              {
                name: "Ricardo M.",
                role: "Professor",
                text: "Uso em sala e o engajamento aumentou muito. As crianças participam mais e aprendem brincando. Recomendo para todos os colegas.",
                image: "https://i.imgur.com/cB9iUMc.png",
              },
              {
                name: "Carla R.",
                role: "Reforço Escolar",
                text: "Material simples e realmente funciona. Os pais elogiam os resultados e as crianças adoram. Melhor investimento que fiz esse ano.",
                image: "https://i.imgur.com/KUGmzI3.png",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                    width="48"
                    height="48"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            ❓ Dúvidas Frequentes
          </h2>
          <FaqAccordion />
        </div>
      </section>

      {/* ── Guarantee ── */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-blue-50 p-8 md:p-12 rounded-2xl text-center border-2 border-[#2F6BFF] shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up">
            <ShieldCheck className="mx-auto mb-4 text-[#2F6BFF] animate-float" size={60} />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">7 Dias de Garantia</h2>
            <p className="text-lg text-gray-700">
              Teste o material.
              <br />
              Se não gostar, devolvemos todo seu dinheiro.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#1a3a8a] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Compra 100% Segura</h3>
            <p className="text-blue-200 mb-2">
              Acesso imediato ao conteúdo digital. Proteção total de dados e suporte dedicado.
            </p>
            <p className="text-blue-300">e-mail: suporte@dinamicascriativas.com</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
            <span>Pagamento Criptografado</span>
            <span>Suporte</span>
            <span>Garantia de Satisfação</span>
          </div>
          <div className="text-center text-blue-300 text-sm">
            © 2026 @dinamicas.criativas
            <br />
            Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
