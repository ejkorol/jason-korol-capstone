import HomeIcon from "@/app/icons/HomeIcon";
import JournalIcon from "@/app/icons/JournalIcon";
import FriendsIcon from "@/app/icons/FriendsIcon";
import QuestionIcon from "@/app/icons/QuestionIcon";

const buttons = [
  {
    name: "Home",
    link: "/dashboard",
    icon: HomeIcon
  },
  {
    name: "Journal",
    link: "/dashboard/journal",
    icon: JournalIcon
  },
  {
    name: "Symbols",
    link: "/dashboard/symbols",
    icon: QuestionIcon
  },
  {
    name: "Friends",
    link: "/dashboard/friends",
    icon: FriendsIcon
  }
];

export default buttons;
