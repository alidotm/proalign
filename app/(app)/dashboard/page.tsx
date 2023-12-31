import AppHeader from "@/components/app-header";
import AuthElement from "@/components/auth-element";
import {
    CreateProjectDrawer,
    CreateProjectDrawerTrigger,
} from "@/components/create-project-drawer";
import Header from "@/components/header";
import ProjectsTable from "@/components/projects-table";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs";
import { PlusCircleIcon } from "lucide-react";
import { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
    title: "Dashboard",
};

export default async function DashboardPage() {
    const user = await currentUser();

    return (
        <Fragment>
            <Header AuthElement={AuthElement} />
            <main className="container space-y-10">
                <AppHeader
                    title="Dashboard"
                    description="Manage your projects here."
                >
                    <CreateProjectDrawerTrigger asChild>
                        <Button>
                            <PlusCircleIcon className="mr-2 h-4 w-4" />
                            <span>Create Project</span>
                        </Button>
                    </CreateProjectDrawerTrigger>
                </AppHeader>

                <ProjectsTable userId={user?.id as string} />

                <CreateProjectDrawer />
            </main>
        </Fragment>
    );
}
