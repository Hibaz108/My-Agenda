import Link from "next/link";

const ForgotPasswordForm = () => {
  return (
    <div className="min-h-svh flex items-center justify-center">
      <div className="w-full max-w-md bg-background p-4 rounded-2xl shadow-sm">
        <h1 className="text-xl text-primary font-bold mb-1">
          Reset your password
        </h1>

        <p className="text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        <form className="my-3">
          <label htmlFor="email" className="text-heading font-semibold">
            Email
          </label>

          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            className="w-full bg-input p-2 mt-1 rounded-lg outline-none placeholder:text-sm focus-visible:ring-2 focus-visible:ring-primary "
          />

          <button
            type="button"
            className="w-full bg-primary p-2 mt-4 text-sm text-primary-foreground font-semibold rounded-lg
            hover:bg-primary-hover transition-colors"
          >
            Send reset link
          </button>
        </form>

        <Link
          href="/login"
          className="block text-center text-primary/80 hover:text-primary-hover transition-colors"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
