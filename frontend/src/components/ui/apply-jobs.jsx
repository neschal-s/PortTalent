import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input";
import { Button } from './button';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from 'react-hook-form';




const schema = z.object({
    experience: z.preprocess(
        (val) => Number(val),
        z.number().min(0, { message: "Experience must be at least 0" })
    ),
    skills: z.string().min(1, { message: "Skills are required" }),
    education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
        message: 'Education is required'
    }),
    resume: z.any().refine(file => file[0] && file[0].type === "application/pdf" ||
        file[0].type === "application/msword",
        { message: "Only pdf or Word documents are allowed" }
    ),
})
const ApplyJobDrawer = ({ user, job, applied = false, fetchJob }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),

    })

    return (
        <Drawer open={applied ? false : undefined}>
            <DrawerTrigger asChild>
                <Button variant={job?.isOpen && !applied ? "blue" : "destructive"}
                    disabled={!job?.isOpen || applied} size="lg">
                    {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}

                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Apply for {job?.title} at {job?.company?.name}</DrawerTitle>
                    <DrawerDescription>Please fill the form below.</DrawerDescription>
                </DrawerHeader>
                <form className='flex flex-col gap-4 p-4 pb-0'>
                    <Input type="number" placeholder='Years of Experience' className='flex-1'
                        {...register("experience", { valueAsNumber: true, })}
                    />
                    {errors.experience && (
                        <p className='tex-red-500'>{errors.experience.message}</p>
                    )}

                    <Input type="text" placeholder='Skills (comma seperated)' className='flex-1'
                        {...register("skills")} />
                    {errors.skills && (
                        <p className='tex-red-500'>{errors.skills.message}</p>
                    )}
                    <Controller
                        control={control}
                        name="education"
                        render={({ field }) => (
                            <RadioGroup {...field} onValueChange={field.onChange}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Intermediate" id="intermediate" />
                                    <Label htmlFor="intermediate">Intermediate</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Graduate" id="graduate" />
                                    <Label htmlFor="graduate">Graduate</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Post Graduate" id="post-graduate" />
                                    <Label htmlFor="post-graduate">Post Graduate</Label>
                                </div>
                            </RadioGroup>
                        )}
                    />
                    {errors.education && (
                        <p className='tex-red-500'>{errors.education.message}</p>
                    )}

                    <Input type="file" accept='.pdf,.docx,.doc' className='flex-1 file:text-gray-500' {...register("resume")}/>
                    {errors.resume && (
                        <p className='tex-red-500'>{errors.resume.message}</p>
                    )}
                    
                    <Button type='submit' variant='blue' size='lg'>Apply</Button>
                </form>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default ApplyJobDrawer