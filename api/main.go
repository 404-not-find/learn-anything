package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

// Entry struct
type Entry struct {
	ID    int    `json:"mapID"`
	Key   string `json:"key"`
	Title string `json:"title"`
}

func (e Entry) toString() string {
	bytes, err := json.Marshal(e)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}
	return string(bytes)
}

func getEntries() []Entry {
	entries := make([]Entry, 1935) // TODO: Don't harcode
	raw, err := ioutil.ReadFile("./maps.json")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}
	json.Unmarshal(raw, &entries)
	return entries
}

func main() {
	entries := getEntries()
	for _, e := range entries {
		fmt.Println(e.toString())
	}
}
