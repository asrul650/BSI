package core

import (
	"crypto/rand"
	"fmt"
)

const alphaNum = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

func GenerateTicketID(prefix string) (string, error) {
	const length = 8
	bytes := make([]byte, length)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}

	out := make([]byte, length)
	for i := 0; i < length; i++ {
		out[i] = alphaNum[int(bytes[i])%len(alphaNum)]
	}
	return fmt.Sprintf("%s-%s", prefix, string(out)), nil
}