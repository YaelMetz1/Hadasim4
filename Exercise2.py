import math

# A function that prints the number of asterisks in each row of the triangle
def createLine(w, number):
    row="*"*number
    print(row.center(w, ' '))

#main function
def main():
    option=int(input("Hi\n" +
                    "If you want to choose rectangle tower please press 1\n" +
                    "If you want to choose triangular tower please press 2\n" +
                    "To exit please press 3:\n"))

    while option != 3:
        height = int(input("Please enter height:"))
        width = int(input("Please enter width:"))

        match option:
            case 1:
                if (abs(height - width) > 5 or height == width):                               #rectangle
                    print("The area is: " + str(height * width) + "\n")
                else:
                    print("The perimeter is: " + str((height + width) * 2) + "\n")
            case 2:                                                                            #triangular
                op =int(input("If you want the perimeter of the triangular please press 1\n" +
                        "If you want the shape of the triangular please press 2:"))
                match op:
                    case 1:
                        side = math.sqrt(pow(width / 2, 2) + math.pow(height, 2))
                        print("The perimeter is: " + str(2 * side + width) + "\n")
                    case 2:
                        if (width % 2 == 0 or width > height * 2):
                            print("There is no option to print the trianguler\n")
                        else:
                            wh = width // 2 - 1                        #The number of levels in the middle part of the triangle
                            createLine(width, 1)                       #printing the first row - 1 asterisk only

                            if wh > 0:
                                for i in range((height - 2) % wh):      #prinring the part of the modulo in the triangle- will allways be 3 asterisks
                                    createLine(width, 3)

                                for i in range(wh):                     #number of levels
                                    for j in range((height - 2) // wh): #number of rows in each level
                                        createLine(width, 3 + i * 2)
                                        
                            #(X,3) is a exception case because there is no odd number between 1 and 3.But you still need to put an intermediate row of asterisks,
                            #so, I put a 3 asterisks line.
                            elif width == 3:
                                for i in range(height-2):
                                    createLine(0, width)
                            createLine(0, width)                        #printing the last row- the number of asterisks is width
        option = int(input("If you want to choose rectangle tower please press 1\n" +
                            "If you want to choose triangular tower please press 2\n" +
                            "To exit please press 3:"))
                                
                                
main()