'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
    const [showForm, setShowForm] = useState(false);
    const [selectedJob, setSelectedJob] = useState('');

    const openForm = (job: string) => {
        setSelectedJob(job);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setSelectedJob('');
    };

    // Prevent background scroll when modal opens
    useEffect(() => {
        if (showForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showForm]);

    return (
        <>
            {/* Header */}
            <header className="relative bg-zinc-900 text-yellow-400 py-40 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-transparent to-yellow-600/10 animate-pulse"></div>

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.15)_0%,transparent_70%)] opacity-50"></div>

                {/* Hero Content */}
                <div className="relative max-w-7xl mx-auto px-6 flex justify-center items-center min-h-[300px]">
                    <div className="group cursor-pointer transition-all duration-500 ease-out">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest text-white drop-shadow-2xl text-center">
                            Grow with <span className="text-yellow-400">DriWE</span>
                        </h1>

                        <div className="h-1.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-3"></div>
                    </div>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-12 left-16 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping delay-75"></div>

                    <div className="absolute top-20 right-32 w-1 h-1 bg-yellow-300 rounded-full animate-ping delay-300"></div>

                    <div className="absolute bottom-16 left-1/3 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping delay-500"></div>

                    <div className="absolute top-32 right-20 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-700"></div>
                </div>

                {/* Simple Scroll Arrow */}
                <div
                    onClick={() => {
                        document
                            .getElementById('jobs-section')
                            ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer z-20"
                >
                    <span className="text-yellow-400 text-sm mb-2">
                        Scroll Down
                    </span>

                    <div className="animate-simple-bounce text-yellow-400 text-3xl">
                        ↓
                    </div>
                </div>

            </header>

            {/* Main Content */}
            <main className="min-h-screen bg-neutral-950 text-gray-100 p-6 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">

                    {/* Join DriWE Crew */}
                    <div className="mb-20">
                        <h2 className="text-4xl font-extrabold text-center text-white mb-4">
                            Join <span className="text-yellow-400">DriWE Crew</span>
                        </h2>

                        <p className="max-w-3xl mx-auto text-center text-white/70 leading-relaxed text-lg mb-12">
                            DriWE Crew is a culture-driven community built around movement,
                            experiences, nightlife, content, and social energy.

                            <br />
                            <br />

                            We are looking for socially active people who love going out,
                            creating content, meeting new people, and being part of something
                            exciting and fast-growing.
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                            {/* Left Card */}
                            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-400/5 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8 hover:scale-[1.02] transition duration-300 shadow-[0_0_30px_rgba(250,204,21,0.08)]">
                                <h3 className="text-2xl font-bold text-yellow-400 mb-5">
                                    Why People Love DriWE
                                </h3>

                                <div className="space-y-4 text-white/80 leading-relaxed">
                                    <p>
                                        Become part of a vibrant social ecosystem where every
                                        experience helps you connect, grow, and create memories.
                                    </p>

                                    <p>
                                        From nightlife experiences to premium events and creator
                                        collaborations — DriWE is more than a community,
                                        it’s a lifestyle.
                                    </p>

                                    <p>
                                        Whether you’re a content creator, social explorer,
                                        event lover, or network builder — there’s a place
                                        for you here.
                                    </p>
                                </div>
                            </div>

                            {/* Perks */}
                            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-xl">
                                <h3 className="text-2xl font-bold text-white mb-6">
                                    Crew <span className="text-yellow-400">Perks</span>
                                </h3>

                                <div className="space-y-4">
                                    {[
                                        'Exclusive events & outings',
                                        'Guestlist access',
                                        'Artist & comedian meetups',
                                        'Premium social experiences',
                                        'Networking opportunities',
                                        'Growth within the DriWE community',
                                    ].map((perk, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 hover:bg-yellow-500/10 hover:border-yellow-500/30 transition"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>

                                            <span className="text-white/85">
                                                {perk}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Open Position */}
                    <div className="mt-20 bg-gradient-to-br from-yellow-500/10 to-yellow-400/5 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(250,204,21,0.08)]">
                        <h2 className="text-4xl font-extrabold mb-10 text-white text-center">
                            Join the <span className="text-yellow-400">Movement</span>
                        </h2>

                        <div
                            id="jobs-section"
                            className="max-w-4xl mx-auto bg-gradient-to-br from-zinc-900 to-black border border-yellow-500/20 rounded-3xl p-8 md:p-10 shadow-[0_0_40px_rgba(250,204,21,0.08)] hover:shadow-[0_0_50px_rgba(250,204,21,0.15)] transition-all duration-500"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                                <div>
                                    <h3 className="text-3xl font-bold text-white">
                                        DriWE <span className="text-yellow-400">Crew</span>
                                    </h3>

                                    <p className="text-white/60 mt-2">
                                        Lifestyle • Community • Social Experiences
                                    </p>
                                </div>

                                <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-5 py-2 rounded-full text-sm font-semibold w-fit">
                                    Open Position
                                </div>
                            </div>

                            <div className="space-y-5 text-white/75 leading-relaxed text-[15px]">
                                <p>
                                    We are building a lifestyle-driven community where members
                                    represent DriWE naturally through experiences, content,
                                    and social influence.
                                </p>

                                <div>
                                    <h4 className="text-white font-semibold mb-4">
                                        We value:
                                    </h4>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {[
                                            'Energy',
                                            'Creativity',
                                            'Social Presence',
                                            'Consistency',
                                            'Communication',
                                            'Initiative',
                                        ].map((item, i) => (
                                            <div
                                                key={i}
                                                className="bg-white/5 border border-white/10 rounded-2xl px-3 md:px-4 py-3 text-center hover:bg-yellow-500/10 hover:border-yellow-500/30 transition break-words"
                                            >
                                                <span className="text-white/90 text-sm md:text-base">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <p>
                                    Members who actively contribute through content,
                                    customer growth, and participation unlock bigger
                                    opportunities and experiences within DriWE.
                                </p>

                                <p className="text-yellow-400 font-medium">
                                    If you think you match the vibe, apply below and
                                    become part of the movement.
                                </p>
                            </div>

                            {/* Apply Button */}
                            <div className="mt-10 flex justify-center">
                                <button
                                    onClick={() => openForm('DriWE Crew')}
                                    className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-2xl transition-all duration-300 hover:bg-yellow-400 hover:scale-105 hover:shadow-[0_0_25px_rgba(250,204,21,0.5)]"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overscroll-none">

                        {/* Modal Box */}
                        <div className="bg-zinc-900 rounded-2xl w-full max-w-lg shadow-2xl border border-yellow-500/30 overflow-hidden">

                            {/* Scrollable Content */}
                            <div className="max-h-[90vh] overflow-y-auto p-6 md:p-8">
                                <h2 className="text-2xl font-bold text-yellow-400 text-center mb-2">
                                    Apply for: {selectedJob}
                                </h2>

                                <p className="text-gray-400 text-center text-sm mb-6">
                                    Please fill out the form below to submit your application.
                                </p>

                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();

                                        try {
                                            const formElement = e.currentTarget as HTMLFormElement;

                                            const fd = new FormData(formElement);

                                            const mobile = fd.get('mobileNumber')?.toString() || '';

                                            // Mobile validation
                                            if (!/^[6-9]\d{9}$/.test(mobile)) {
                                                alert('Please enter a valid 10-digit mobile number');
                                                return;
                                            }

                                            const res = await fetch('/api/application', {
                                                method: 'POST',
                                                body: fd,
                                            });

                                            let data: any = {};

                                            try {
                                                data = await res.json();
                                            } catch {
                                                data = {};
                                            }

                                            if (!res.ok) {
                                                throw new Error(
                                                    data?.error ||
                                                    'Email already exists or application already submitted'
                                                );
                                            }

                                            alert('Application submitted successfully');

                                            formElement.reset();

                                            closeForm();

                                        } catch (error: any) {
                                            alert(
                                                error.message ||
                                                'Something went wrong'
                                            );
                                        }
                                    }}
                                    encType="multipart/form-data"
                                    className="space-y-4"
                                >
                                    <input
                                        type="hidden"
                                        name="position"
                                        value={selectedJob}
                                    />

                                    <input
                                        name="name"
                                        placeholder="Full Name"
                                        required
                                        className="border border-zinc-700 bg-zinc-950 w-full p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />

                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        required
                                        className="border border-zinc-700 bg-zinc-950 w-full p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />

                                    {/* DOB Input */}
                                    <input
                                        name="dob"
                                        type="text"
                                        placeholder="DD/MM/YYYY"
                                        className="border border-zinc-700 bg-zinc-950 w-full p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />

                                    {/* Mobile Number */}
                                    <input
                                        name="mobileNumber"
                                        type="tel"
                                        placeholder="Mobile Number"
                                        maxLength={10}
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        onInput={(e: any) => {
                                            e.target.value = e.target.value.replace(/\D/g, '');
                                        }}
                                        className="border border-zinc-700 bg-zinc-950 w-full p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />

                                    <input
                                        name="education"
                                        placeholder="Education"
                                        className="border border-zinc-700 bg-zinc-950 w-full p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />

                                    <input
                                        name="experience"
                                        placeholder="Experience"
                                        className="border border-zinc-700 bg-zinc-950 w-full p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />

                                    <textarea
                                        name="address"
                                        placeholder="Address"
                                        className="border border-zinc-700 bg-zinc-950 w-full p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    ></textarea>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">
                                            Upload Resume (Max 2MB)
                                        </label>

                                        <input
                                            name="resume"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];

                                                if (file && file.size > 2 * 1024 * 1024) {
                                                    alert('Resume size must be less than 2MB');
                                                    e.target.value = '';
                                                }
                                            }}
                                            className="border border-zinc-700 bg-zinc-950 w-full p-2 rounded-lg text-gray-100 focus:outline-none file:bg-yellow-500 file:text-black file:font-semibold file:px-3 file:py-1.5 file:rounded file:border-none file:hover:bg-yellow-400 transition"
                                        />
                                    </div>

                                    <div className="flex justify-between pt-4 gap-4">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.6)]"
                                        >
                                            Submit Application
                                        </button>

                                        <button
                                            type="button"
                                            onClick={closeForm}
                                            className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold px-5 py-2.5 rounded-lg transition"
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