'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
export default function HomePage() {
    const [submitting, setSubmitting] = useState(false);
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
    const [jobs, setJobs] = useState<any[]>([]);
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
    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await fetch('/api/jobs');

            const data = await res.json();

            setJobs(data);
        } catch (error) {
            console.error('Failed to fetch jobs');
        }
    };

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

                    {/* Join DriWE */}
                    <div className="mb-20">
                        <h2 className="text-4xl font-extrabold text-center text-white mb-4">
                            Join <span className="text-yellow-400">DriWE</span>
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

                                <div className="space-y-5">
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
                                            className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-b-0"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>

                                            <span className="text-white/85">
                                                {perk}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Open Positions */}
                    <div className="mt-20">
                        <h2 className="text-4xl font-extrabold mb-10 text-white text-center">
                            Open <span className="text-yellow-400">Positions</span>
                        </h2>

                        <div id="jobs-section" className="space-y-8">
                            {jobs.map((job) => (
                                <div
                                    key={job.jobId}
                                    className="bg-gradient-to-br from-zinc-900 to-black border border-yellow-500/20 rounded-3xl p-8 md:p-10 shadow-[0_0_40px_rgba(250,204,21,0.08)]"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                                        <div>
                                            <h3 className="text-3xl font-bold text-white">
                                                {job.title}
                                            </h3>

                                            <p className="text-white/60 mt-2">
                                                Experience: {job.experience || 'Not specified'}
                                            </p>
                                        </div>

                                        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-5 py-2 rounded-full text-sm font-semibold w-fit">
                                            Open Position
                                        </div>
                                    </div>

                                    <div className="space-y-5 text-white/75 leading-relaxed text-[15px]">
                                        <div>
                                            <h4 className="text-white font-semibold mb-2">
                                                Description
                                            </h4>

                                            <p>{job.description}</p>
                                        </div>

                                        <div>
                                            <h4 className="text-white font-semibold mb-2">
                                                Responsibilities
                                            </h4>

                                            <p>{job.responsibilities}</p>
                                        </div>

                                        <div>
                                            <h4 className="text-white font-semibold mb-2">
                                                Required Skills
                                            </h4>

                                            <p>{job.requiredSkills}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                                            <span>
                                                Education: {job.education || 'Not specified'}
                                            </span>

                                            <span>
                                                Experience: {job.experience || 'Not specified'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-10 flex justify-center">
                                        <button
                                            onClick={() => openForm(job.title)}
                                            className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-2xl transition-all duration-300 hover:bg-yellow-300 hover:scale-105"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            ))}
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
                                    // onSubmit={async (e) => {
                                    //     e.preventDefault();

                                    //     try {
                                    //         const formElement = e.currentTarget as HTMLFormElement;

                                    //         const fd = new FormData(formElement);

                                    //         const mobile = fd.get('mobileNumber')?.toString() || '';

                                    //         // Mobile validation
                                    //         if (!/^[6-9]\d{9}$/.test(mobile)) {
                                    //             alert('Please enter a valid 10-digit mobile number');
                                    //             return;
                                    //         }

                                    //         const res = await fetch('/api/application', {
                                    //             method: 'POST',
                                    //             body: fd,
                                    //         });

                                    //         let data: any = {};

                                    //         try {
                                    //             data = await res.json();
                                    //         } catch {
                                    //             data = {};
                                    //         }

                                    //         if (!res.ok) {
                                    //             throw new Error(
                                    //                 data?.error ||
                                    //                 'Email already exists'
                                    //             );
                                    //         }

                                    //         toast.success(
                                    //             'Application submitted successfully! We will review your application and get back to you soon.'
                                    //         );

                                    //         formElement.reset();

                                    //         closeForm();

                                    //     } catch (error: any) {
                                    //         toast.error(error.message || 'Something went wrong');
                                    //     }
                                    // }}
                                    onSubmit={async (e) => {
                                        e.preventDefault();

                                        setSubmitting(true);

                                        try {
                                            const formElement = e.currentTarget as HTMLFormElement;

                                            const fd = new FormData(formElement);

                                            const mobile = fd.get('mobileNumber')?.toString() || '';

                                            if (!/^[6-9]\d{9}$/.test(mobile)) {
                                                alert('Please enter a valid 10-digit mobile number');
                                                setSubmitting(false);
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
                                                throw new Error(data?.error || 'Email already exists');
                                            }

                                            toast.success(
                                                'Application submitted successfully! We will review your application and get back to you soon.'
                                            );

                                            formElement.reset();
                                            closeForm();
                                        } catch (error: any) {
                                            toast.error(error.message || 'Something went wrong');
                                        } finally {
                                            setSubmitting(false);
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

                                    <select
                                        name="gender"
                                        required
                                        className="border border-zinc-700 bg-zinc-950 w-full p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>

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
                                        {/* <button
                                            type="submit"
                                            className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.6)]"
                                        >
                                            Submit Application
                                        </button> */}
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className={`flex-1 font-semibold px-5 py-2.5 rounded-lg transition-all duration-300
    ${submitting
                                                    ? 'bg-yellow-300 cursor-not-allowed opacity-70'
                                                    : 'bg-yellow-500 hover:bg-yellow-400 text-black hover:shadow-[0_0_15px_rgba(250,204,21,0.6)]'
                                                }`}
                                        >
                                            {submitting ? 'Submitting...' : 'Submit Application'}
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