import ProjectAccessForm from "@/components/project-access-form";
import ProjectMembersForm from "@/components/project-members-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CollaboratorsPageProps = {
    params: {
        id: string;
    };
};

export default function CollaboratorsPage({ params }: CollaboratorsPageProps) {
    return (
        <main className="container max-w-4xl space-y-6 px-0 py-6">
            <Tabs defaultValue="members">
                <TabsList>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="access">Access</TabsTrigger>
                </TabsList>
                <TabsContent value="members">
                    <ProjectMembersForm />
                </TabsContent>
                <TabsContent value="access">
                    <ProjectAccessForm projectId={params.id} />
                </TabsContent>
            </Tabs>
        </main>
    );
}