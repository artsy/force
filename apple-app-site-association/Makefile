#
# To support iOS 8’s Handoff/Shared Web Credentials features, this file needs to be signed.
# Starting from iOS 9 the signing is no longer required, so this can be removed when we drop iOS 8 support.
#
# Get the artsy.net SSL certificate files from the 1password engineering vault and place them in a directory.
# Then create the signed file like so:
#
#     $ make CERT_DIR="/path/to/dir/with/certs"
#
# Be sure to remember to delete the certificate files from your local file system once done.
#

all:
	cat apple-app-site-association.json | openssl smime -sign -inkey "$(CERT_DIR)/artsy.net.key" -signer "$(CERT_DIR)/artsy.net.crt" -certfile "$(CERT_DIR)/artsy.net.intermediate.crt" -noattr -nodetach -outform DER > ../public/apple-app-site-association
