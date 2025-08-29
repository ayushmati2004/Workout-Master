import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

function FeatureCard({ icon, title, description, isDarkMode, delay }) {
    const cardBg = isDarkMode ? 'bg-gray-900/80 backdrop-blur-lg' : 'bg-white/90 backdrop-blur-lg';
    const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const borderColor = isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50';
    
    return (
        <div 
            className={`group ${cardBg} border ${borderColor} p-8 rounded-3xl shadow-2xl transition-all duration-700 transform hover:scale-110 hover:rotate-1 hover:shadow-red-500/25 animate-slideInLeft cursor-pointer`}
            style={{ transitionDelay: `${delay}ms`, animationDelay: `${delay}ms` }}
        >
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-all duration-300">
            </div>
            <h3 className={`${textColor} text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors duration-300`}>{title}</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-base leading-relaxed group-hover:text-opacity-90`}>{description}</p>
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    );
}

function TestimonialCard({ name, role, quote, avatar, isDarkMode, delay }) {
    const cardBg = isDarkMode ? 'bg-gray-900/90 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl';
    const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const borderColor = isDarkMode ? 'border-gray-700/30' : 'border-gray-200/30';
    
    return (
        <div 
            className={`group ${cardBg} border ${borderColor} p-8 rounded-3xl shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-rotate-1 hover:shadow-purple-500/20 animate-slideInRight cursor-pointer relative overflow-hidden`}
            style={{ transitionDelay: `${delay}ms`, animationDelay: `${delay}ms` }}
        >
            <div className="flex items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-4 group-hover:animate-pulse shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300`}>
                    <span className="text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">{avatar}</span>
                </div>
                <div>
                    <h4 className={`${textColor} font-bold text-lg group-hover:text-purple-500 transition-colors duration-300`}>{name}</h4>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium`}>{role}</p>
                </div>
            </div>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-base italic leading-relaxed relative z-10`}>"{quote}"</p>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    );
}

export default function Hero({ isDarkMode }) {
    const navigate = useNavigate();
    const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const accentColor = 'text-red-600';
    const secondaryTextColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
    const sectionBg = isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50';
    
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Set loaded after a short delay to trigger animations
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);
    
    const features = [
        {
            title: "Smart Planning",
            description: "AI-powered workout plans customized to your specific fitness goals and experience level."
        },
        {
            title: "Adaptive Training",
            description: "Workouts that evolve as you progress, ensuring continuous improvement and preventing plateaus."
        },
        {
            title: "Progress Tracking",
            description: "Comprehensive tracking of your workout history and achievements to stay motivated."
        },
        {
            title: "Goal-focused",
            description: "Specialized training approaches for strength, hypertrophy, or endurance based on your objectives."
        }
    ];
    
    const testimonials = [
        {
            name: "Alex Chen",
            role: "Fitness Enthusiast",
            quote: "WorkOut Master transformed my training routine. I've gained 10lbs of muscle in just 3 months!",
            avatar: "AC"
        },
        {
            name: "Sarah Miller",
            role: "Marathon Runner",
            quote: "The endurance programs helped me shave 15 minutes off my marathon time. Absolutely incredible!",
            avatar: "SM"
        },
        {
            name: "James Wilson",
            role: "Beginner Lifter",
            quote: "As someone new to lifting, this app made it easy to get started with confidence. Love the form tips!",
            avatar: "JW"
        }
    ];
    
    const stats = [
        { number: "500+", label: "Workout Plans" },
        { number: "12k+", label: "Active Users" },
        { number: "98%", label: "Success Rate" },
        { number: "24/7", label: "Expert Support" }
    ];
    
    return (
        <div className='flex flex-col w-full'>
            {/* Hero Section */}
            <div className='min-h-[90vh] flex flex-col gap-10 items-center justify-center text-center max-w-[900px] w-full mx-auto p-4 relative'>
                <div className='flex flex-col gap-4 z-10'>
                    <p className={`${accentColor} font-medium uppercase tracking-widest transition-all duration-700 transform ${
                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>TRANSFORM YOUR FITNESS JOURNEY</p>
                    <h1 className={`uppercase font-black text-4xl sm:text-5xl md:text-6xl lg:text-8xl ${textColor} transition-all duration-700 delay-200 transform ${
                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    } tracking-tight`}>
                        <span className="inline-block hover:animate-bounce transition-transform duration-300">Work</span>
                        <span className={`${accentColor} relative group workoutText inline-block ml-2`}>
                            <span className="absolute -inset-2 bg-gradient-to-r from-red-500 to-orange-500 opacity-20 rounded-2xl blur-lg group-hover:opacity-40 transition-all duration-500 animate-pulse"></span>
                            <span className="relative bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent animate-pulse hover:animate-bounce transition-transform duration-300">Out</span>
                        </span>
                        <span className="inline-block hover:animate-bounce transition-transform duration-300 ml-2">Master</span>
                    </h1>
                </div>
                <p className={`text-lg md:text-xl font-medium max-w-[700px] ${secondaryTextColor} transition-all duration-700 delay-400 transform leading-relaxed ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                    Get <span className="text-red-500 font-bold">AI-powered</span> workouts tailored to your goals, track your progress with <span className="text-orange-500 font-bold">real-time analytics</span>, and achieve the results you've always wanted. Join the fitness revolution!
                </p>
                <div className={`transition-all duration-700 delay-600 transform ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                    <button 
                        onClick={() => navigate('/generate')}
                        className="group relative px-12 py-5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-black text-xl uppercase tracking-wider rounded-2xl shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-500 transform hover:scale-110 hover:-rotate-1 animate-pulse"
                    >
                        <span className="relative z-10">
                            Create Your Workout
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-pulse"></div>
                    </button>
                </div>
                
                {/* Stats Section */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-10 transition-all duration-700 delay-800 transform ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                    {stats.map((stat, index) => (
                        <div key={index} className={`group ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/90'} backdrop-blur-lg border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl transform hover:scale-110 hover:rotate-3 transition-all duration-500 animate-rotateIn cursor-pointer`} style={{ animationDelay: `${index * 100}ms` }}>
                            <p className={`bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent font-black text-3xl md:text-4xl group-hover:animate-pulse`}>{stat.number}</p>
                            <p className={`${secondaryTextColor} text-sm md:text-base font-semibold mt-2 group-hover:text-red-500 transition-colors duration-300`}>{stat.label}</p>
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    ))}
                </div>
                
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <div 
                            key={i}
                            className={`absolute rounded-full bg-workout-red opacity-10 ${isDarkMode ? 'bg-opacity-20' : 'bg-opacity-30'} animate-lift`}
                            style={{
                                width: `${Math.random() * 200 + 50}px`,
                                height: `${Math.random() * 200 + 50}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: `float ${Math.random() * 20 + 30}s linear infinite, lift ${Math.random() * 3 + 2}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 20}s`,
                                transform: `translate(-50%, -50%) scale(${Math.random() * 0.5 + 0.5})`,
                            }}
                        />
                    ))}
                </div>
            </div>
            
            {/* Features Section */}
            <div className={`${sectionBg} py-16 px-4 w-full`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className={`text-5xl font-black mb-6 ${textColor} bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent`}>Why Choose WorkOut Master?</h2>
                        <p className={`${secondaryTextColor} max-w-3xl mx-auto text-xl leading-relaxed`}>
                            Our platform offers <span className="text-red-500 font-bold">scientifically-backed</span> training methods powered by AI to help you achieve your fitness goals <span className="text-orange-500 font-bold">faster</span> and more efficiently than ever before!
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <FeatureCard 
                                key={index}
                                title={feature.title}
                                description={feature.description}
                                isDarkMode={isDarkMode}
                                delay={index * 100}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Testimonials Section */}
            <div className="py-16 px-4 w-full">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className={`text-5xl font-black mb-6 ${textColor} bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}>What Our Users Say</h2>
                        <p className={`${secondaryTextColor} max-w-3xl mx-auto text-xl leading-relaxed`}>Join <span className="text-purple-500 font-bold">thousands</span> of satisfied users who have transformed their fitness journey with WorkOut Master. Real results, real people!</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard 
                                key={index}
                                name={testimonial.name}
                                role={testimonial.role}
                                quote={testimonial.quote}
                                avatar={testimonial.avatar}
                                isDarkMode={isDarkMode}
                                delay={index * 100}
                            />
                        ))}
                    </div>
                    
                    <div className="text-center mt-16">
                        <button 
                            onClick={() => navigate('/generate')}
                            className="group relative px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-xl uppercase tracking-wider rounded-2xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-500 transform hover:scale-110 hover:rotate-1"
                        >
                            <span className="relative z-10">
                                Start Your Fitness Journey
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
