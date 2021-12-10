/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsAboutTheWorkFromPartner_artwork = {
    readonly additional_information: string | null;
    readonly sale: {
        readonly isBenefit: boolean | null;
        readonly isGalleryAuction: boolean | null;
    } | null;
    readonly partner: {
        readonly internalID: string;
        readonly slug: string;
        readonly type: string | null;
        readonly href: string | null;
        readonly name: string | null;
        readonly initials: string | null;
        readonly locations: ReadonlyArray<{
            readonly city: string | null;
        } | null> | null;
        readonly is_default_profile_public: boolean | null;
        readonly profile: {
            readonly slug: string;
            readonly icon: {
                readonly cropped: {
                    readonly src: string;
                    readonly srcSet: string;
                } | null;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"FollowProfileButton_profile">;
        } | null;
    } | null;
    readonly " $refType": "ArtworkDetailsAboutTheWorkFromPartner_artwork";
};
export type ArtworkDetailsAboutTheWorkFromPartner_artwork$data = ArtworkDetailsAboutTheWorkFromPartner_artwork;
export type ArtworkDetailsAboutTheWorkFromPartner_artwork$key = {
    readonly " $data"?: ArtworkDetailsAboutTheWorkFromPartner_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkDetailsAboutTheWorkFromPartner_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkDetailsAboutTheWorkFromPartner_artwork",
  "selections": [
    {
      "alias": "additional_information",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "additionalInformation",
      "storageKey": "additionalInformation(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isBenefit",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isGalleryAuction",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "initials",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Location",
          "kind": "LinkedField",
          "name": "locations",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "city",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": "is_default_profile_public",
          "args": null,
          "kind": "ScalarField",
          "name": "isDefaultProfilePublic",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Profile",
          "kind": "LinkedField",
          "name": "profile",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "icon",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 45
                    },
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 45
                    }
                  ],
                  "concreteType": "CroppedImageUrl",
                  "kind": "LinkedField",
                  "name": "cropped",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "src",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "srcSet",
                      "storageKey": null
                    }
                  ],
                  "storageKey": "cropped(height:45,width:45)"
                }
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "FollowProfileButton_profile"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = '9ec2f5a9558b00c1e1818f617924a0a6';
export default node;
