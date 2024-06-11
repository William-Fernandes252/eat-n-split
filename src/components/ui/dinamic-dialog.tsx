import type { DialogProps } from "@radix-ui/react-dialog";
import { useMediaQuery } from "react-responsive";
import { Button } from "./button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "./drawer";

type DinamicDialogProps = React.PropsWithChildren<{
	/**
	 * Whether the dialog is open or not.
	 */
	open?: DialogProps["open"];

	/**
	 * Function that will be called when the dialog is closed.
	 */
	onOpenChange?: DialogProps["onOpenChange"];

	/**
	 * Function that will be called when the dialog is closed.
	 */
	onClose?: React.ComponentProps<typeof Drawer>["onClose"];

	/**
	 * The title of the dialog.
	 */
	title: React.ReactNode | string;

	/**
	 * The description of the dialog.
	 */
	description: React.ReactNode | string;

	/**
	 * The content of the dialog
	 */
	content?: React.ReactNode;

	/**
	 * The action of the dialog.
	 *
	 * It will be placed on the right side of the footer.
	 * It must close the dialog when interacted.
	 */
	action: React.ReactNode;

	/**
	 * Optional children that can be used as a trigger for the dialog.
	 */
	children?: React.ReactNode;
}>;

export default function DinamicDialog({
	open,
	onClose,
	title,
	children,
	description,
	content,
	action,
}: DinamicDialogProps) {
	const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
	const cancelButton = (
		<Button
			variant="outline"
			onClick={() => onClose?.()}
			data-test="cancel-action-button"
		>
			Cancel
		</Button>
	);
	return isLargeScreen ? (
		<Dialog open={open} onOpenChange={(open) => !open && onClose?.()}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="font-semibold">{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{content}
				<DialogFooter>
					<DialogClose asChild>{action}</DialogClose>
					<DialogClose asChild>{cancelButton}</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	) : (
		<Drawer open={open} onClose={onClose}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader className="text-left">
						<DrawerTitle>{title}</DrawerTitle>
						<DrawerDescription>{description}</DrawerDescription>
					</DrawerHeader>
					{content}
					<DrawerFooter>
						<DrawerClose asChild>{action}</DrawerClose>
						<DrawerClose asChild>{cancelButton}</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
