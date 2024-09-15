import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AdminCreateStudent from "../students/auth/signUpStudent"


export default function AddStudent() {
    return <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
            <AdminCreateStudent />
        </DialogContent>
    </Dialog>

}