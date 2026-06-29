import axios from "axios";
import { useState } from "react";

export default function ContactForm() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        // Validation
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setError("All fields are required");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError("Please enter a valid email address");
            return;
        }

        // Optional phone validation
        if (form.phone.trim()) {
            const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
            if (!phoneRegex.test(form.phone)) {
                setError("Please enter a valid phone number or leave it blank");
                return;
            }
        }

        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:5000/api/contact",
                form
            );

            if (response.data.success) {
                setSuccess(true);
                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                });
                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send message. Please try again.");
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={submitHandler}
            className="space-y-6"
        >
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-xl">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-500/20 border border-green-500 text-green-200 p-4 rounded-xl">
                    Message sent successfully! We&apos;ll get back to you soon.
                </div>
            )}

            <input
                type="text"
                className="
        w-full
        p-4
        rounded-xl
        glass
        outline-none
        focus:border-yellow-500
        transition-all
        "
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                    setForm({
                        ...form,
                        name: e.target.value
                    })
                }
                disabled={loading}
            />

            <input
                type="email"
                className="
        w-full
        p-4
        rounded-xl
        glass
        outline-none
        focus:border-yellow-500
        transition-all
        "
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                    setForm({
                        ...form,
                        email: e.target.value
                    })
                }
                disabled={loading}
            />

            <input
                type="tel"
                className="
        w-full
        p-4
        rounded-xl
        glass
        outline-none
        focus:border-yellow-500
        transition-all
        "
                placeholder="Phone Number (Optional)"
                value={form.phone}
                onChange={(e) =>
                    setForm({
                        ...form,
                        phone: e.target.value
                    })
                }
                disabled={loading}
            />

            <textarea
                rows="6"
                className="
        w-full
        p-4
        rounded-xl
        glass
        outline-none
        focus:border-yellow-500
        transition-all
        resize-none
        "
                placeholder="Message"
                value={form.message}
                onChange={(e) =>
                    setForm({
                        ...form,
                        message: e.target.value
                    })
                }
                disabled={loading}
            />

            <button
                type="submit"
                disabled={loading}
                className="
        bg-yellow-500
        text-black
        px-8
        py-4
        rounded-xl
        font-semibold
        hover:bg-yellow-600
        transition-all
        disabled:opacity-50
        disabled:cursor-not-allowed
        "
            >
                {loading ? "Sending..." : "Send Message"}
            </button>

        </form>
    );
}
