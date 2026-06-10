import fs from 'fs';
import path from 'path';

const EXPECTED_FILES = [
  'platform-training-manual.md',
  'dashboard-map-and-purpose.md',
  'admin-user-separation-guide.md',
  'demo-walkthrough-guide.md',
  'role-based-navigation-guide.md',
  'readiness-status-explainer.md',
  'operator-quick-start-guide.md',
  'founder-demo-coaching-guide.md'
];

const MANDATORY_TERMS = [
  'isolation',
  'minimum-privilege',
  'minimum-viable',
  'Mustafa Jalal Khoshnaw'
];

async function runTrainingQA() {
  console.log('====================================================');
  console.log('IDG TECHNICAL AUDIT: PHASE 5.15 TRAINING PACKAGE INTEGRITY');
  console.log('====================================================');

  const docsDir = path.join(process.cwd(), 'docs', 'training');

  if (!fs.existsSync(docsDir)) {
    console.error(`❌ FAIL: Training manual directory missing at: ${docsDir}`);
    process.exit(1);
  }

  let failed = false;
  let allContent = '';

  for (const fileName of EXPECTED_FILES) {
    const filePath = path.join(docsDir, fileName);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ FAIL: Missing training workbook file: ${fileName}`);
      failed = true;
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    allContent += '\n' + content;

    // Check classification headers
    const hasCorrectClass = content.includes('RESTRICTED TRAINING DOCUMENT') || content.includes('CONFIDENTIAL EXECUTIVE COACHING NOTE');
    if (!hasCorrectClass) {
      console.error(`❌ FAIL: ${fileName} does not contain required classification headers.`);
      failed = true;
    }

    // Guard against fake live approval claims or hardcoded override hacks
    if (content.match(/automatically approved|bypass verification checks|automatic credential validation/i)) {
      console.error(`❌ FAIL: ${fileName} contains unvetted claims of automatic credentials validation.`);
      failed = true;
    }

    console.log(`✓ FILE FOUND & CLASSIFIED: ${fileName}`);
  }

  if (failed) {
    console.error('❌ QA FAILED: Some training workbooks are missing or misclassified.');
    process.exit(1);
  }

  // Validate required technical terms
  for (const term of MANDATORY_TERMS) {
    if (!allContent.toLowerCase().includes(term.toLowerCase())) {
      console.error(`❌ FAIL: Crucial design or strategic term missing from manual set: "${term}"`);
      failed = true;
    } else {
      console.log(`✓ TERM DETECTED: "${term}"`);
    }
  }

  if (failed) {
    console.error('❌ QA FAILED: Mandatory technical architectural safeguards missing.');
    process.exit(1);
  }

  console.log('\n🌟 SUCCESS: PHASE 5.15 TRAINING PACKAGE AND JURISDICTION COMPLIANCE PASS!');
  console.log('====================================================\n');
  process.exit(0);
}

runTrainingQA();
