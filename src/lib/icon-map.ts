import {
  Code,
  Sparkles,
  Terminal,
  FileText,
  File,
  Image,
  Link as LinkIcon,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

export const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Code,
  Sparkles,
  Terminal,
  FileText,
  File,
  Image,
  Link: LinkIcon,
};
