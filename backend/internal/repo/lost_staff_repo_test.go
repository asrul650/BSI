package repo

import "testing"

func TestMaskPhone(t *testing.T) {
	tests := []struct {
		name  string
		phone string
		want  string
	}{
		{name: "keeps prefix and last digits", phone: "+62 812-9844-890", want: "6281•••••890"},
		{name: "hides short numbers", phone: "1234", want: "••••"},
		{name: "empty number", phone: "", want: ""},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			if got := maskPhone(test.phone); got != test.want {
				t.Fatalf("maskPhone(%q) = %q, want %q", test.phone, got, test.want)
			}
		})
	}
}
