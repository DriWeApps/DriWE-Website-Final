'use client';
import { useState } from 'react';

export default function HomePage() {
    const [showForm, setShowForm] = useState(false);
    const [selectedJob, setSelectedJob] = useState('');

    const openForm = (job: string) => {
        setSelectedJob(job);
        setShowForm(true);
    };
    const closeForm = () => setShowForm(false);

    return (
        <>
            {/* Header */}
            <header className="relative bg-zinc-900 text-yellow-400 py-40 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-transparent to-yellow-600/10 animate-pulse"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.15)_0%,transparent_70%)] opacity-50"></div>

                {/* FIXED: Perfect center on mobile (Android & iOS) */}
                <div className="relative max-w-7xl mx-auto px-6 flex justify-center items-center min-h-[300px]">
                    <div className="group cursor-pointer transition-all duration-500 ease-out">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest text-white drop-shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:tracking-normal">
                            Grow with <span className="text-yellow-400">DriWE</span>
                        </h1>

                        <div className="h-1.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left mt-3"></div>
                    </div>
                </div>

                {/* Subtle floating particles for premium effect */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-12 left-16 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping delay-75"></div>
                    <div className="absolute top-20 right-32 w-1 h-1 bg-yellow-300 rounded-full animate-ping delay-300"></div>
                    <div className="absolute bottom-16 left-1/3 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping delay-500"></div>
                    <div className="absolute top-32 right-20 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-700"></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="min-h-screen bg-neutral-950 text-gray-100 p-6 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">

                    {/* === Why Join DriWE? – darkGlass Style (No Icons, Pure Content) === */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-10 text-white text-center">
                            Why Join <span className="text-yellow-400">DriWE</span>?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card 1: Growth */}
                            <div className="max-w-xs sm:max-w-sm w-full mx-auto p-6 text-center hover:scale-[1.05] transition-transform duration-300 bg-yellow-500/10 backdrop-blur-md border border-white/20 rounded-3xl">
                                <h3 className="text-xl font-bold text-yellow-400 mb-2">Accelerated Growth</h3>
                                <p className="text-sm text-white/80 leading-relaxed">
                                    Rapid learning, mentorship from industry leaders, and clear paths to leadership roles.
                                </p>
                            </div>

                            {/* Card 2: Innovation */}
                            <div className="max-w-xs sm:max-w-sm w-full mx-auto p-6 text-center hover:scale-[1.05] transition-transform duration-300 bg-yellow-500/10 backdrop-blur-md border border-white/20 rounded-3xl">
                                <h3 className="text-xl font-bold text-yellow-400 mb-2">Cutting-Edge Tech</h3>
                                <p className="text-sm text-white/80 leading-relaxed">
                                    Work with React, Next.js, AI tools, and modern stacks shaping the future.
                                </p>
                            </div>

                            {/* Card 3: Culture */}
                            <div className="max-w-xs sm:max-w-sm w-full mx-auto p-6 text-center hover:scale-[1.05] transition-transform duration-300 bg-yellow-500/10 backdrop-blur-md border border-white/20 rounded-3xl">
                                <h3 className="text-xl font-bold text-yellow-400 mb-2">Vibrant Culture</h3>
                                <p className="text-sm text-white/80 leading-relaxed">
                                    Collaborative, inclusive, and rewarding — with perks, flexibility, and recognition.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Open Positions */}
                    <h2 className="text-3xl font-bold mb-6 text-white text-center">
                        Open <span className="text-yellow-400">Positions</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Job Card 1 */}
                        <div
                            className="bg-white text-black p-6 rounded-lg shadow transition-transform duration-300 ease-in-out 
              hover:bg-gray-100 hover:shadow-[0_4px_20px_rgba(250,204,21,0.4)] hover:scale-105 hover:border hover:border-yellow-400"
                        >
                            <h3 className="text-xl font-semibold">
                                Backend <span className="text-yellow-500">Developer</span>
                            </h3>
                            <p><strong>Education:</strong> B.E./B.Tech/BSC in Computer Science or related field</p>
                            <p><strong>Experience:</strong> 0-2 years</p>
                            <strong>Location:</strong> <span> Pune</span>
                            <p><strong>Required Skills:</strong> Node.js, Express.js, REST APIs, MySQL, JWT/Auth, Git.</p>
                            <p><strong>Description:</strong> Build secure, scalable backend systems and RESTful APIs. Design database schemas, implement authentication, and optimize performance for high-traffic applications.</p>
                            <p className="flex items-center gap-1 text-sm mt-3">
                            </p>
                            <button
                                onClick={() => openForm('Backend Developer')}
                                className="mt-4 bg-yellow-400 text-black font-semibold px-4 py-2 rounded transition-transform duration-300 ease-in-out 
                hover:bg-yellow-500 hover:text-gray-900 hover:scale-105 hover:shadow-[0_0_15px_rgba(250,204,21,0.7)]"
                            >
                                Apply Now
                            </button>
                        </div>

                        <div
                            className="bg-white text-black p-6 rounded-lg shadow transition-transform duration-300 ease-in-out 
              hover:bg-gray-100 hover:shadow-[0_4px_20px_rgba(250,204,21,0.4)] hover:scale-105 hover:border hover:border-yellow-400"
                        >
                            <h3 className="text-xl font-semibold">
                                Frontend <span className="text-yellow-500">Developer</span>
                            </h3>
                            <p><strong>Education:</strong> B.E./B.Tech/BSC in Computer Science or related field</p>
                            <p><strong>Experience:</strong> 0-2 years</p>
                            <strong>Location:</strong> <span> Pune</span>
                            <p><strong>Required Skills:</strong> React.js / Next.js (must), TypeScript or JavaScript (ES6+), HTML, CSS, Tailwind CSS.</p>
                            <p><strong>Description:</strong> Build pixel-perfect, blazing-fast UIs with React & Next.js. Collaborate with design and backend teams to deliver innovative, user-centric digital experiences using modern web technologies.</p>
                            <p className="flex items-center gap-1 text-sm mt-3">
                            </p>
                            <button
                                onClick={() => openForm('Frontend Developer')}
                                className="mt-4 bg-yellow-400 text-black font-semibold px-4 py-2 rounded transition-transform duration-300 ease-in-out 
                hover:bg-yellow-500 hover:text-gray-900 hover:scale-105 hover:shadow-[0_0_15px_rgba(250,204,21,0.7)]"
                            >
                                Apply Now
                            </button>
                        </div>

                        <div
                            className="bg-white text-black p-6 rounded-lg shadow transition-transform duration-300 ease-in-out 
              hover:bg-gray-100 hover:shadow-[0_4px_20px_rgba(250,204,21,0.4)] hover:scale-105 hover:border hover:border-yellow-400"
                        >
                            <h3 className="text-xl font-semibold">
                                Sales & Marketing <span className="text-yellow-500">Executive</span>
                            </h3>
                            <p><strong>Education:</strong> MBA / BBA</p>
                            <p><strong>Experience:</strong> 0-2 years</p>
                            <strong>Location:</strong> <span>Pune</span>
                            <p><strong>Required Skills:</strong> Excellent communication & interpersonal skills, Strong negotiation and closing abilities, Digital marketing basics (SEO, Social Media, Email).</p>
                            <p><strong>Description:</strong> Join our growing team as a results-driven Sales & Marketing Executive. Drive business growth through strong client relationships, impactful campaigns, and revenue success.</p>
                            <p className="flex items-center gap-1 text-sm mt-3">

                            </p>
                            <button
                                onClick={() => openForm('Sales & Marketing Executive')}
                                className="mt-4 bg-yellow-400 text-black font-semibold px-4 py-2 rounded transition-transform duration-300 ease-in-out 
                hover:bg-yellow-500 hover:text-gray-900 hover:scale-105 hover:shadow-[0_0_15px_rgba(250,204,21,0.7)]"
                            >
                                Apply Now
                            </button>
                        </div>

                        {/* Job Card 2 */}
                        <div
                            className="bg-white text-black p-6 rounded-lg shadow transition-transform duration-300 ease-in-out 
              hover:bg-gray-100 hover:shadow-[0_4px_20px_rgba(250,204,21,0.4)] hover:scale-105 hover:border hover:border-yellow-400"
                        >
                            <h3 className="text-xl font-semibold">
                                Document Verification <span className="text-yellow-500">Specialist</span>
                            </h3>
                            <p><strong>Education:</strong> 12th Pass or Any Graduation</p>
                            <p><strong>Experience:</strong> 0-2 years</p>
                            <strong>Location:</strong> <span>Pune</span>
                            <p><strong>Required Skills:</strong> Proficiency in MS Office & Excel, Basic Knowledge of KYC/AML Guidelines, Strong Analytical & Observation Skills.</p>
                            <p><strong>Description:</strong> Detail-oriented Document Verification Specialist to validate KYC, IDs & records with accuracy. Ensure compliance and operational integrity with precision.</p>
                            <p className="flex items-center gap-1 text-sm mt-3">

                            </p>
                            <button
                                onClick={() => openForm('Document Verification Specialist')}
                                className="mt-4 bg-yellow-400 text-black font-semibold px-4 py-2 rounded transition-transform duration-300 ease-in-out 
                hover:bg-yellow-500 hover:text-gray-900 hover:scale-105 hover:shadow-[0_0_15px_rgba(250,204,21,0.7)]"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Application Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        {/* Outer scrollable wrapper */}
                        <div className="max-h-[90vh] w-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 rounded-2xl">
                            <div className="bg-zinc-900 p-6 md:p-8 rounded-2xl w-full max-w-lg mx-auto shadow-2xl border border-yellow-500/30">
                                <h2 className="text-2xl font-bold text-yellow-400 text-center mb-2">
                                    Apply for: {selectedJob}
                                </h2>
                                <p className="text-gray-400 text-center text-sm mb-4">
                                    Please fill out the form below to submit your application.
                                </p>

                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        const fd = new FormData(e.currentTarget as HTMLFormElement);
                                        const res = await fetch('/api/application', { method: 'POST', body: fd });
                                        if (res.ok) {
                                            alert('Application submitted successfully');
                                            setShowForm(false);
                                        } else {
                                            const err = await res.json().catch(() => ({ error: 'Failed' }));
                                            alert('Submission failed: ' + (err?.error || 'Unknown error'));
                                        }
                                    }}
                                    encType="multipart/form-data"
                                    className="space-y-4 overflow-y-auto max-h-[70vh] pr-2"
                                >
                                    <input type="hidden" name="position" value={selectedJob} />
                                    <input
                                        name="name"
                                        className="border border-zinc-700 bg-zinc-950 w-full p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="Full Name"
                                        required
                                    />
                                    <input
                                        name="email"
                                        type="email"
                                        className="border border-zinc-700 bg-zinc-950 w-full p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="Email"
                                        required
                                    />
                                    <input
                                        name="dob"
                                        type="date"
                                        className="border border-zinc-700 bg-zinc-950 w-full p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                    <input
                                        name="mobileNumber"
                                        className="border border-zinc-700 bg-zinc-950 w-full p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="Mobile Number"
                                    />
                                    <input
                                        name="education"
                                        className="border border-zinc-700 bg-zinc-950 w-full p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="Education"
                                    />
                                    <input
                                        name="experience"
                                        className="border border-zinc-700 bg-zinc-950 w-full p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="Experience"
                                    />
                                    <textarea
                                        name="address"
                                        className="border border-zinc-700 bg-zinc-950 w-full p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="Address"
                                    ></textarea>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Upload Resume</label>
                                        <input
                                            name="resume"
                                            type="file"
                                            className="border border-zinc-700 bg-zinc-950 w-full p-2 rounded-lg text-gray-100 focus:outline-none file:bg-yellow-500 file:text-black file:font-semibold file:px-3 file:py-1.5 file:rounded file:border-none file:hover:bg-yellow-400 transition"
                                        />
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <button
                                            type="submit"
                                            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.6)]"
                                        >
                                            Submit Application
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            className="bg-zinc-700 hover:bg-zinc-600 text-white font-semibold px-5 py-2.5 rounded-lg transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}


