export function EmailSignup() {
  return (
    <section className="bg-neutral-900 text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-14 text-center">
        <h3 className="text-2xl font-semibold md:text-3xl">Get early access to drops</h3>
        <p className="text-sm text-white/70">No spam. Unsubscribe anytime.</p>
        <form className="flex w-full max-w-md items-center gap-2" action="#" method="post" onSubmit={(e)=>e.preventDefault()}>
          <input name="email" type="email" required placeholder="your@email"
                 className="w-full rounded-xl bg-white/10 px-4 py-3 placeholder-white/50 outline-none ring-1 ring-white/15 focus:ring-white/30" />
          <button className="rounded-xl bg-white px-4 py-3 text-black">Join</button>
        </form>
      </div>
    </section>
  );
}

