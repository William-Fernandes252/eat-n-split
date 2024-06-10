import "@/index.css";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import FriendList from "./components/data/friend-list";
import AddFriendForm from "./components/forms/add-friend-form";
import BillSplitForm from "./components/forms/bill-split-form";
import ThemeOptionsMenu from "./components/menus/theme-options-menu";
import { Button } from "./components/ui/button";
import { ScrollArea } from "./components/ui/scroll-area";
import { useFriends } from "./contexts/friends";

function App() {
	const { selected: friend } = useFriends();
	const [isAddFormOpen, setIsAddFormOpen] = useState(false);
	return (
		<div className="container max-w-screen h-screen flex p-4 justify-center items-center relative">
			<main className="flex md:gap-4 h-full justify-center ">
				<div className="flex flex-col col-span-1 h-96 gap-4">
					<ScrollArea className="overflow-y-auto px-3 pb-2 border rounded-md">
						<FriendList />
					</ScrollArea>
					<Button onClick={() => setIsAddFormOpen(true)}>
						Add Friend <PlusIcon size="1rem" className="ml-1" />
					</Button>
				</div>
				{friend && (
					<ScrollArea>
						<BillSplitForm
							key={friend.id}
							friend={friend}
							className="col-span-11 h-fit"
						/>
					</ScrollArea>
				)}
			</main>
			<AddFriendForm
				open={isAddFormOpen}
				onClose={() => setIsAddFormOpen(false)}
			/>
			<ThemeOptionsMenu className="absolute bottom-4 right-4 rounded-full" />
		</div>
	);
}

export default App;
