-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_documentAuthorId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_workspaceAuthorId_fkey";

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_workspaceAuthorId_fkey" FOREIGN KEY ("workspaceAuthorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_documentAuthorId_fkey" FOREIGN KEY ("documentAuthorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
