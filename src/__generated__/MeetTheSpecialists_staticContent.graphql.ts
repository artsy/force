/**
 * @generated SignedSource<<f3325ff655743be05aad3d4c366bb3ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MeetTheSpecialists_staticContent$data = {
  readonly specialistBios: ReadonlyArray<{
    readonly bio: string;
    readonly email: string;
    readonly firstName: string;
    readonly image: {
      readonly imageURL: string | null | undefined;
    };
    readonly jobTitle: string;
    readonly name: string;
  }> | null | undefined;
  readonly " $fragmentType": "MeetTheSpecialists_staticContent";
};
export type MeetTheSpecialists_staticContent$key = {
  readonly " $data"?: MeetTheSpecialists_staticContent$data;
  readonly " $fragmentSpreads": FragmentRefs<"MeetTheSpecialists_staticContent">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MeetTheSpecialists_staticContent",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SpecialistBio",
      "kind": "LinkedField",
      "name": "specialistBios",
      "plural": true,
      "selections": [
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
          "name": "firstName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "jobTitle",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bio",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "email",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "image",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "imageURL",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "StaticContent",
  "abstractKey": null
};

(node as any).hash = "cbbb113a812e6d0bfccd4a0da7a5d937";

export default node;
