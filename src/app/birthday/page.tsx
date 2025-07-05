import Image from "next/image";

export default function BirthdayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            🎈
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Main greeting */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white drop-shadow-lg animate-pulse">
          🎉 ВІТАЄМО! 🎉
        </h1>

        {/* Max's photo */}
        <div className="relative mx-auto">
          <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] rounded-full border-8 border-yellow-400 shadow-2xl overflow-hidden animate-spin-slow">
            <Image
              src="/max.PNG"
              alt="Max"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-4 -right-4 text-6xl animate-bounce">
            👑
          </div>
        </div>

        {/* Birthday message */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-yellow-300 drop-shadow-lg">
            ТЕПЕР У МАКСА
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-yellow-300 drop-shadow-lg">
            ВЛАСНИЙ ВЕБ-САЙТ!! 🚀
          </h2>
        </div>

        {/* Funny messages */}
        <div className="space-y-6 text-white">
          <p className="text-2xl md:text-4xl lg:text-5xl font-bold animate-bounce">
            🎂 З ДНЕМ НАРОДЖЕННЯ, МАКС! 🎂
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 md:p-8 lg:p-10 border-4 border-yellow-400">
            <p className="text-xl md:text-3xl lg:text-4xl font-semibold text-yellow-200 mb-4">
              🎭 Найкумедніший хлопець на світі! 🎭
            </p>
            <p className="text-lg md:text-2xl lg:text-3xl font-medium">
              🌟 Тепер ти офіційно власник сайту! 🌟
            </p>
            <p className="text-lg md:text-2xl lg:text-3xl font-medium mt-2">
              🎪 Готовий підкорювати інтернет своїм гумором! 🎪
            </p>
          </div>
        </div>

        {/* Fun facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-6 transform rotate-3 hover:rotate-0 transition-transform">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-xl md:text-2xl font-bold text-white">
              Статус: ЛЕГЕНДА!
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-6 transform -rotate-3 hover:rotate-0 transition-transform">
            <div className="text-4xl mb-2">🚀</div>
            <p className="text-xl md:text-2xl font-bold text-white">
              Рівень веселощів: МАКСИМУМ!
            </p>
          </div>
        </div>

        {/* Celebration text */}
        <div className="text-center space-y-4">
          <p className="text-3xl md:text-5xl lg:text-6xl font-black text-yellow-300 animate-pulse">
            🎊 СВЯТКУЄМО! 🎊
          </p>
          <p className="text-xl md:text-3xl lg:text-4xl font-bold text-white">
            Хай цей день буде найкращим! 🥳
          </p>
        </div>

        {/* Animated emojis */}
        <div className="flex justify-center space-x-4 text-6xl md:text-8xl animate-bounce">
          <span className="animate-spin">🎈</span>
          <span className="animate-pulse">🎂</span>
          <span className="animate-bounce">🎉</span>
          <span className="animate-spin">🎁</span>
          <span className="animate-pulse">🎊</span>
        </div>
      </div>
    </div>
  );
}
