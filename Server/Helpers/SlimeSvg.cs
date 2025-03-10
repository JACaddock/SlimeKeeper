using Server.Enums;
using Server.Models;

namespace Server.Helpers
{
    public static class SlimeSvg
    {
        public static string PrepareSvg(Slime slime)
        {
            string workingSvg = @"
                <svg xmlns='http://www.w3.org/2000/svg' 
                    style='background: transparent; background-color: transparent; color-scheme: light dark;'
                    version='1.1' width='100px' height='100px'";

            if (slime.Age > 1)
            {
                workingSvg += "viewBox='-0.5 -0.5 31 21'>";
                workingSvg += PrepareAdultSvg(slime);
            }
            else
            {
                workingSvg += "viewBox='-10 -5 31 21'>";
                workingSvg += PrepareChildSvg(slime);
            }

            workingSvg += "</svg>";
            return workingSvg;
        }

        private static string PrepareAdultSvg(Slime slime)
        {
            string workingSvg = "";

            // Body
            workingSvg += "<ellipse id='body' cx='15' cy='10' "
                       + CalculatePartSize(SlimePart.BODY, slime.Size)
                       + " fill='" + slime.Color
                       + "' stroke='#000000' stroke-width='0.2' />";

            // Mouth
            workingSvg += "<path id='mouth' "
                       + CalculatePartSize(SlimePart.MOUTH, slime.Size)
                       + " fill='#ff8000' stroke='#000000' stroke-width='0.5' transform='rotate(90,15,15)' />";

            // Left Eye
            workingSvg += "<circle id='eye1' "
                       + CalculatePartSize(SlimePart.EYE1, slime.Size)
                       + " fill='#ffffff' stroke='#000000' stroke-width='0.5' />";
            // Left Iris
            workingSvg += "<circle id='iris1' "
                       + CalculatePartSize(SlimePart.IRIS1, slime.Size)
                       + " fill='#000000' stroke='none' />";

            // Right Eye
            workingSvg += "<circle id='eye2' "
                       + CalculatePartSize(SlimePart.EYE2, slime.Size)
                       + " fill='#ffffff' stroke='#000000' stroke-width='0.5' />";

            // Right Iris
            workingSvg += "<circle id='iris2' "
                       + CalculatePartSize(SlimePart.IRIS2, slime.Size)
                       + " fill ='#000000' stroke='none' />";

            return workingSvg;
        }

        private static string PrepareChildSvg(Slime slime)
        {
            string workingSvg = "";

            // Body
            workingSvg += "<circle id='body' "
                       + CalculatePartSize(SlimePart.CHILDBODY, slime.Size)
                       + " fill='" + slime.Color
                       + "' stroke='#000000' stroke-width='0.2' />";

            // Left Iris
            workingSvg += "<circle id='iris1' "
                       + "cx='3' cy='4' r='1'"
                       + " fill='#000000"
                       + "' stroke='none' />";

            // Right Iris
            workingSvg += "<circle id='iris2' "
                       + "cx='7' cy='4' r='1'"
                       + " fill='#000000"
                       + "' stroke='none' />";

            return workingSvg;
        }

        private static string CalculatePartSize(SlimePart bodyPart, int size)
        {
            switch (bodyPart)
            {
                case SlimePart.BODY:
                    return "rx='" + (10 + size) + "' ry='" + (8 + size) + "'";

                case SlimePart.MOUTH:
                    if (size < 3)
                    {
                        return "d='M 12 10 Q 15 10 15 15 Q 15 20 12 20 Q 15 15 12 10 Z'";
                    }
                    return "d='M 13 9 Q 17 9 17 15 Q 17 21 13 21 Q 15 15 13 9 Z'";

                case SlimePart.EYE1:
                    if (size < 3)
                    {
                        return "cx='12' cy='8' r='1.8'";
                    }
                    return "cx='11' cy='8' r='2'";

                case SlimePart.IRIS1:
                    if (size < 3)
                    {
                        return "cx='12' cy='8' r='0.9'";
                    }
                    return "cx='11' cy='8' r='1'";

                case SlimePart.EYE2:
                    if (size < 3)
                    {
                        return "cx='18' cy='8' r='1.8'";
                    }
                    return "cx='19' cy='8' r='2'";

                case SlimePart.IRIS2:
                    if (size < 3)
                    {
                        return "cx='18' cy='8' r='0.9'";
                    }
                    return "cx='19' cy='8' r='1'";

                case SlimePart.CHILDBODY:
                    return "cx='5' cy='5' r='" + (5 + (size / 2)) + "'";

                default:
                    return "";
            }
        }
    }
}
