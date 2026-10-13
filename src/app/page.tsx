import { FeatureSection } from "@/components/FeatureSection";
import { FeedbackSection } from "@/components/FeedbackSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ProblemSection } from "@/components/ProblemSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { RideStorySection } from "@/components/RideStorySection";
import { SafetySection } from "@/components/SafetySection";
import { CrewChatVisual } from "@/components/visuals/CrewChatVisual";
import { LeadVisual } from "@/components/visuals/LeadVisual";
import { RouteVisual } from "@/components/visuals/RouteVisual";
import { StayTogetherVisual } from "@/components/visuals/StayTogetherVisual";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <ProblemSection />
        <ProductShowcase />

        <div id="features" className="scroll-mt-16">
          <FeatureSection
            letter="A"
            layout="split"
            eyebrow="Group location"
            status="in-development"
            title={
              <>
                Stay
                <br />
                together.
              </>
            }
            body="See your fellow riders on one shared map for the whole ride, so nobody has to wonder who is ahead, who is behind or whether the group has split."
            points={[
              "Rider locations shared across the group",
              "One map, the same view for everyone",
            ]}
            visual={<StayTogetherVisual />}
          />

          <FeatureSection
            letter="B"
            layout="wide"
            tone="charcoal"
            eyebrow="Route guidance"
            status="in-development"
            title={
              <>
                Find your <span className="text-amber">way.</span>
              </>
            }
            body="Follow a route as a group and keep track of how far along the ride you are, with the next turn always in view."
            points={[
              "Route guidance for the whole group",
              "Progress along the route at a glance",
            ]}
            visual={<RouteVisual />}
          />

          <FeatureSection
            letter="C"
            layout="split-reverse"
            eyebrow="Communication"
            status="in-development"
            title={
              <>
                Your crew,
                <br />
                connected.
              </>
            }
            body="Group chat and quick actions keep everyone coordinated, whether it's a fuel stop, a regroup or a change of plan, without anyone pulling over to ask."
            points={[
              "Group chat built into every ride",
              "Quick actions for common coordination",
            ]}
            visual={<CrewChatVisual />}
          />

          <FeatureSection
            letter="D"
            layout="panel"
            eyebrow="Ride leadership"
            status="in-development"
            title={
              <>
                Lead the
                <br />
                ride.
              </>
            }
            body="Every group ride needs someone to hold it together. Leader and Co-Leader roles give the crew clear structure, with an overview of everyone on the ride."
            points={[
              "Leader and Co-Leader roles",
              "Rider status and ride overview",
            ]}
            visual={<LeadVisual />}
          />
        </div>

        <SafetySection />
        <RideStorySection />
        <FinalCTA />
        <FeedbackSection />
      </main>
      <Footer />
    </>
  );
}
