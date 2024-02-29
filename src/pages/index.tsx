import Landing from "../../components/Landing";
import LoginModal from "../../components/modals/LoginModal";
import SignupModal from "../../components/modals/SignupModal";


export default function Home() {
  return (
    <>
    <div>
    <Landing />
    </div>
    <LoginModal />
    <SignupModal/>
    </>
  );
}
