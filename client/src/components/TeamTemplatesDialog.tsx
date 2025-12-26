import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Save, 
  FolderOpen, 
  Trash2, 
  Loader2, 
  FileText,
  Clock,
  BarChart
} from "lucide-react";
import { format } from "date-fns";

interface Player {
  id: string;
  name: string;
  role: string;
  team: string;
}

interface TeamTemplatesDialogProps {
  currentPlayers: Player[];
  captainId?: string;
  viceCaptainId?: string;
  matchType?: string;
  onLoadTemplate: (players: Player[], captainId?: string, viceCaptainId?: string) => void;
}

export function TeamTemplatesDialog({
  currentPlayers,
  captainId,
  viceCaptainId,
  matchType,
  onLoadTemplate,
}: TeamTemplatesDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaveMode, setIsSaveMode] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");

  const utils = trpc.useUtils();
  const { data: templates, isLoading } = trpc.templates.list.useQuery(undefined, {
    enabled: isOpen,
  });

  const createMutation = trpc.templates.create.useMutation({
    onSuccess: () => {
      toast.success("Template saved successfully!");
      setTemplateName("");
      setTemplateDescription("");
      setIsSaveMode(false);
      utils.templates.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = trpc.templates.delete.useMutation({
    onSuccess: () => {
      toast.success("Template deleted");
      utils.templates.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const useMutation = trpc.templates.use.useMutation();

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }
    if (currentPlayers.length === 0) {
      toast.error("Please select players before saving a template");
      return;
    }

    createMutation.mutate({
      name: templateName,
      description: templateDescription || undefined,
      matchType,
      captainId,
      viceCaptainId,
      players: currentPlayers,
    });
  };

  const handleLoadTemplate = (template: NonNullable<typeof templates>[0]) => {
    const players = template.players as Player[];
    onLoadTemplate(
      players,
      template.captainId || undefined,
      template.viceCaptainId || undefined
    );
    useMutation.mutate({ templateId: template.id });
    setIsOpen(false);
    toast.success(`Loaded template: ${template.name}`);
  };

  const handleDeleteTemplate = (templateId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this template?")) {
      deleteMutation.mutate({ templateId });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FolderOpen className="h-4 w-4" />
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Team Templates</DialogTitle>
          <DialogDescription>
            Save your current team as a template or load a previously saved template.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Toggle between save and load */}
          <div className="flex gap-2">
            <Button
              variant={!isSaveMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsSaveMode(false)}
              className="flex-1"
            >
              <FolderOpen className="h-4 w-4 mr-2" />
              Load Template
            </Button>
            <Button
              variant={isSaveMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsSaveMode(true)}
              className="flex-1"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Current Team
            </Button>
          </div>

          {/* Save Mode */}
          {isSaveMode && (
            <div className="space-y-4 border rounded-lg p-4">
              <div className="space-y-2">
                <Label htmlFor="templateName">Template Name</Label>
                <Input
                  id="templateName"
                  placeholder="e.g., My T20 Strategy"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="templateDescription">Description (optional)</Label>
                <Textarea
                  id="templateDescription"
                  placeholder="Describe your strategy..."
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  rows={2}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Current team: {currentPlayers.length} players selected</p>
                {captainId && <p>Captain & Vice-Captain will be saved</p>}
              </div>
              <Button
                onClick={handleSaveTemplate}
                disabled={createMutation.isPending || currentPlayers.length === 0}
                className="w-full"
              >
                {createMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Template
              </Button>
            </div>
          )}

          {/* Load Mode */}
          {!isSaveMode && (
            <div className="space-y-3">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : templates && templates.length > 0 ? (
                templates.map((template) => {
                  const players = template.players as Player[];
                  return (
                    <Card
                      key={template.id}
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleLoadTemplate(template)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <FileText className="h-4 w-4 text-primary" />
                              <h4 className="font-medium">{template.name}</h4>
                              {template.matchType && (
                                <Badge variant="secondary" className="text-xs">
                                  {template.matchType.toUpperCase()}
                                </Badge>
                              )}
                            </div>
                            {template.description && (
                              <p className="text-sm text-muted-foreground mb-2">
                                {template.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {format(new Date(template.updatedAt), "MMM d, yyyy")}
                              </span>
                              <span className="flex items-center gap-1">
                                <BarChart className="h-3 w-3" />
                                Used {template.timesUsed} times
                              </span>
                              <span>{players.length} players</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={(e) => handleDeleteTemplate(template.id, e)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FolderOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No templates saved yet</p>
                  <p className="text-sm">Save your first template to reuse it later!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
