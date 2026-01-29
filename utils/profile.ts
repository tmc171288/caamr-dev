export interface ProfileData {
  avatar: string;
  titles: string[];
  bio: string[];
}

const PROFILE_FILE = "profile.json";

export async function getProfile(): Promise<ProfileData> {
  try {
    const text = await Deno.readTextFile(PROFILE_FILE);
    return JSON.parse(text);
  } catch (error) {
    console.error("Error reading profile:", error);
    return {
      avatar: "/avatar.png",
      titles: ["Tôi là Caamr", "Hay còn gọi là CaamrDev"],
      bio: ["Bio line 1", "Bio line 2"],
    };
  }
}

export async function updateProfile(data: ProfileData): Promise<void> {
  await Deno.writeTextFile(PROFILE_FILE, JSON.stringify(data, null, 2));
}
