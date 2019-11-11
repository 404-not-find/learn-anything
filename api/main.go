package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/maps", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./data/maps.json")
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}
