import Link from "next/link";

export default function HowWeBuild() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 font-[family-name:var(--font-geist-sans)]">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← home
        </Link>
      </div>

      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-3">how we build</h1>
        <p className="text-xs tracking-widest text-gray-600 dark:text-gray-400">Jan 13, ’26</p>
      </header>

      <article className="space-y-10 leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Prove your work’s EV</h2>
          <p className="text-gray-600 dark:text-gray-400">
            The cost of your work is the time spent building and the value is the revenue generated or cost
            saved. Even a small UI tweak can improve retention and revenue. If you want to advocate to build
            something, you must be able to explain how it grows the business. Revenue generated is far more
            important than cost saved.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            If your 30 line function can be re-written in 4 lines we won’t be thrilled. Fix it next time,
            re-writing it now is useless.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Engineer your engineering</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Use your debugger. Load test data via a script you write, do not be a mechanical turk testing
            via clicking through a UI. Think outside the box and invest time into letting you develop
            faster. Experiment with prompts and run them simultaneously. Set-up MCP and tune your system
            prompts.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Your job is to maximize your shipping velocity while maintaining an acceptable level of
            quality.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Ship to win</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Work expands to fill the available time. If a task is assigned with a deadline of one week, it
            will take one week. If that same task is given with a deadline of one day, it will get done
            that day. There should be an inner sense of urgency to give yourself aggressive deadlines.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Our success is directly correlated to how fast we ship features. We don’t make assumptions, we
            view shipping code as an experiment and we want to run as many as possible. Sometimes our
            experiments fail and we remove them. Don’t spend time making any experiment perfect. The more
            experiments we can run the more we can win.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Design and latency compound</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Slow systems demonstrate a lack of professionalism, hurt trust, and cause friction +
            frustration.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            When an action takes more than ~200ms loaders, spinners, and any other indicators are a must.
            Double clicks, unnecessary refreshes, and blank stares cause a poor user experience.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Loaders should have a perfect transition to the loaded content with no snapping and jumps
            across any frame. Take a video of the load and scrub frame by frame to ensure perfection.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Low latency and excellence increases time on-site and conversion.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Tastefully accumulate debt</h2>
          <p className="text-gray-600 dark:text-gray-400">
            When we create tech debt, we can get more done now and pay the cost in the future. If someone
            offered you a loan at an amazing rate you should take it.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Paying full cash is often not economical, nor is writing perfect code. Startups are intended to
            have more resources in the future, tech debt is a lever we choose to pull. If you like debating
            variable names and advocating for performative refactors don’t work at a startup. We learn from
            our mistakes and fix them going forward, not retroactively.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Do not context switching</h2>
          <p className="text-gray-600 dark:text-gray-400">
            When you are in the zone and you get a message or a teammate tries talking to you, more time is
            wasted than the amount of time physically pulling you away from your computer. Coding requires
            you to build a mental map of files, functions, and things you need to do, and when you are
            stopped, it flushes this mental map from your short-term memory. You should chunk together
            larger amounts of time to have conversations, frequent smaller conversations will kill your
            productivity.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            If you never tell anyone to fuck off, you are not maximizing your productivity. This is more
            relevant in-person but applies remote as well.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Glass box</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our system must be a strong glass box. We strive to see exactly what is happening in every
            part of the system from input through the return of any action.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            This means strong logging, client side metrics, session replays, server health, database health,
            error tracking with stack traces, audits of API requests, and historical versions of all
            database objects.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Any issue encountered should be able to be explained and quickly identified. Mysterious,
            unexplainable, bugs are dangerous and time consuming. The easiest way to fix issues is by
            tracking everything humanly possible and aggregating data in easy to parse ways.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Anything is possible</h2>
          <p className="text-gray-600 dark:text-gray-400">
            People have accomplished much harder things than what you are struggling with. You and I are
            always overreacting; we will find a way to make it work.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            We don’t want to hear about it being impossible to speed up a query or center a div, because
            SpaceX can catch a rocket with robotic arms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">I love learning</h2>
          <p className="text-gray-600 dark:text-gray-400">
            You should seek to understand how every abstraction and layer in your code base works. At
            Bloomberg, my boss did not know what HTTP was because it was too far abstracted from all
            day-to-day code. Abstractions are useful, but blind reliance on them makes you slow and fragile.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            When you understand how data flows from the client to the database and back—how caching,
            retries, timeouts, and failures actually behave—you debug faster, make better tradeoffs, and ship
            with confidence. Understand how your tools work, not how to use them. We win at the rate the
            team learns.
          </p>
        </section>
      </article>
    </div>
  );
}


