/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Agent_name_key" ON "Agent"("name");
