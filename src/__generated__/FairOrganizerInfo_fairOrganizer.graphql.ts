/**
 * @generated SignedSource<<e0456598e82a9bc06d610e70bfd4ccb8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerInfo_fairOrganizer$data = {
  readonly about: string | null | undefined;
  readonly " $fragmentType": "FairOrganizerInfo_fairOrganizer";
};
export type FairOrganizerInfo_fairOrganizer$key = {
  readonly " $data"?: FairOrganizerInfo_fairOrganizer$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerInfo_fairOrganizer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerInfo_fairOrganizer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "about",
      "storageKey": "about(format:\"HTML\")"
    }
  ],
  "type": "FairOrganizer",
  "abstractKey": null
};

(node as any).hash = "8c1500080b2355919c6d76e295bc97e7";

export default node;
