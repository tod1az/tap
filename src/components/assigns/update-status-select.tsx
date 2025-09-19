"use client"
import { Status } from "@/generated/prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { STATUS } from "@/lib/sv-utils";
import { useSession } from "next-auth/react";
import { updateAssignUserAction } from "@/lib/actions/assignments";
import { Badge } from "../ui/badge";


type Props = {
  status: Status
  assign_id: number
}

export default function UpdateStatus({ status, assign_id }: Props) {

  const { data: session } = useSession()

  async function handleStatusChange(newStatus: string) {
    //form action 
    try {
      if (!session?.user?.id) throw Error("Unauthorized")
      await updateAssignUserAction({ status: newStatus, assign_id, user_id: session?.user?.id })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Select
      value={status}
      onValueChange={handleStatusChange}   >
      <SelectTrigger
        className={`p-0 m-0 border ${status} hover:opacity-80 transition-opacity`}
      >
        <Badge variant="secondary" className={`border-none capitalize ${status}`}>
          <SelectValue  >{STATUS[status]}</SelectValue>
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {
          Object.entries(STATUS).map(([key, value]) => (
            key !== "overdue"
              ? <SelectItem className="capitalize" value={key} key={key}>{value}</SelectItem>
              : null
          ))
        }
      </SelectContent>
    </Select>
  )
}
