using Microsoft.AspNetCore.Rewrite;
using System.Drawing;

namespace Server.Models
{
    enum SlimePart
    {
        BODY,
        MOUTH,
        EYE1,
        IRIS1,
        EYE2,
        IRIS2,
        CHILDBODY
    }

    public class Slime
    {
        public static int Id { get; set; }
        public string? Name { get; set; }
        public string? Svg { get; set; }
        public int Size { get; set; }
        public string? Color { get; set; }
        public int Age { get; set; } = 1;
        public bool IsOnMarket { get; set; } = false;
        public int Price { get; set; }

        public Slime(string name)
        {
            Id++;
            Name = name;
        }

        public Slime(string name, int price, int size, string color, int age = 1)
        {
            Id++;
            Name = name;
            Price = price;
            IsOnMarket = true;

            if (size < 0) Size = 0;
            else if (size > 5) Size = 5;
            else Size = size;

            Age = age;
            
            Color = color;
            Svg = PrepareSVG();
        }

        private string CalculatePartSize(SlimePart bodyPart)
        {
            switch (bodyPart)
            {
                case SlimePart.BODY:
                    return "rx='" + (10 + Size) + "' ry='" + (8 + Size) + "'";

                case SlimePart.MOUTH:
                    if (Size < 3)
                    {
                        return "d='M 12 10 Q 15 10 15 15 Q 15 20 12 20 Q 15 15 12 10 Z'";
                    }
                    return "d='M 13 9 Q 17 9 17 15 Q 17 21 13 21 Q 15 15 13 9 Z'";

                case SlimePart.EYE1:
                    if (Size < 3)
                    {
                        return "cx='12' cy='8' r='1.8'";
                    }
                    return "cx='11' cy='8' r='2'";

                case SlimePart.IRIS1:
                    if (Size < 3)
                    {
                        return "cx='12' cy='8' r='0.9'";
                    }
                    return "cx='11' cy='8' r='1'";

                case SlimePart.EYE2:
                    if (Size < 3)
                    {
                        return "cx='18' cy='8' r='1.8'";
                    }
                    return "cx='19' cy='8' r='2'";

                case SlimePart.IRIS2:
                    if (Size < 3)
                    {
                        return "cx='18' cy='8' r='0.9'";
                    }
                    return "cx='19' cy='8' r='1'";

                case SlimePart.CHILDBODY:
                    return "cx='5' cy='5' r='" + (5 + (Size/2) ) + "'";

                default:
                    return "";
            }
        }

        private string PrepareSVG()
        {
            string workingSvg = @"
                <?xml version='1.0' encoding='UTF-8'?>
                <!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
                <svg xmlns='http://www.w3.org/2000/svg' 
                    style='background: transparent; background-color: transparent; color-scheme: light dark;'
                    version='1.1' width='100px' height='100px'";

            if (Age > 0)
            {
                workingSvg += "viewBox='-0.5 -0.5 31 21'>";
                workingSvg += PrepareAdultSvg();
            }
            else
            {
                workingSvg += "viewBox='-10 -5 31 21'>";
                workingSvg += PrepareChildSvg();
            }

            workingSvg += "</svg>";
            return workingSvg;
        }

        private string PrepareAdultSvg()
        {
            string workingSvg = "";

            // Body
            workingSvg += "<ellipse id='body' cx='15' cy='10' "
                       + CalculatePartSize(SlimePart.BODY)
                       + " fill='" + Color
                       + "' stroke='#000000' stroke-width='0.2' />";

            // Mouth
            workingSvg += "<path id='mouth' "
                       + CalculatePartSize(SlimePart.MOUTH)
                       + " fill='#ff8000' stroke='#000000' stroke-width='0.5' transform='rotate(90,15,15)' />";

            // Left Eye
            workingSvg += "<circle id='eye1' "
                       + CalculatePartSize(SlimePart.EYE1)
                       + " fill='#ffffff' stroke='#000000' stroke-width='0.5' />";
            // Left Iris
            workingSvg += "<circle id='iris1' "
                       + CalculatePartSize(SlimePart.IRIS1)
                       + " fill='#000000' stroke='none' />";

            // Right Eye
            workingSvg += "<circle id='eye2' "
                       + CalculatePartSize(SlimePart.EYE2)
                       + " fill='#ffffff' stroke='#000000' stroke-width='0.5' />";

            // Right Iris
            workingSvg += "<circle id='iris2' "
                       + CalculatePartSize(SlimePart.IRIS2)
                       + " fill ='#000000' stroke='none' />";

            return workingSvg;
        } 
    
        private string PrepareChildSvg()
        {
            string workingSvg = "";

            // Body
            workingSvg += "<circle id='body' "
                       + CalculatePartSize(SlimePart.CHILDBODY)
                       + " fill='" + Color 
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
    }
}
