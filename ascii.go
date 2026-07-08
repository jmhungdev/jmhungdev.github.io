package main

import "fmt"

func textToHex(text string) {
	for _, char := range text {
		fmt.Printf("%X ", int(char))
	}
	fmt.Println()
}

func textToASCII(text string) {
	for _, char := range text {
		fmt.Printf("%d ", int(char))
	}
	fmt.Println()
}

// convert hex -> decimal and then decimal -> text

func hexToText(hex []string) {
	for _, code := range hex {
		var asciiCode int
		fmt.Sscanf(code, "%X", &asciiCode)
		fmt.Printf("%c", asciiCode)
	}
	fmt.Println()
}

func asciiToText(ascii []int) {
	for _, code := range ascii {
		fmt.Printf("%c", code)
	}
	fmt.Println()
}

func convertToCodePoints(text string) []rune {
	// Split the text into individual runes (Unicode code points)
	runes := []rune(text)

	// Create a slice to store the Unicode code points
	codePoints := make([]rune, 0, len(runes))

	// Iterate over each rune and append its Unicode code point to the slice
	for _, r := range runes {
		codePoints = append(codePoints, r)
	}

	return codePoints
}

func main() {
	// Convert text to hexadecimal
	text := "hello 世界!"
	fmt.Println("Text to Hexadecimal:")
	textToHex(text)

	fmt.Println("Text to decimal:")
	textToASCII(text)

	// Convert hexadecimal to text
	hex := []string{"48", "65", "6C", "6C", "6F", "2C", "20", "57", "6F", "72", "6C", "64", "21"}
	fmt.Println("Hexadecimal to Text:")
	hexToText(hex)

	// Convert the text to Unicode code points
	codePoints := convertToCodePoints(text)

	// Print the Unicode code points
	fmt.Println("Text:", text)
	fmt.Println("Code Points:", codePoints)
}

// Text to Hexadecimal:
// 68 65 6C 6C 6F 20 4E16 754C 21
// Text to decimal:
// 104 101 108 108 111 32 19990 30028 33
// Hexadecimal to Text:
// Hello, World!
// Text: hello 世界!
// Code Points: [104 101 108 108 111 32 19990 30028 33]
