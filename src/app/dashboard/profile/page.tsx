"use client";
import ProfileForm from "@/components/profile/ProfileForm";
import { useAuth } from "@/store/use-auth";

function Page() {
  const { user } = useAuth();
  // getUser();

  return (
    <>
      <div>
        <ProfileForm data={user} />
      </div>
    </>
  );
}

export default Page;
